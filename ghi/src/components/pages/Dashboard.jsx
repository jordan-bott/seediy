import { useSelector } from "react-redux";
import {
  useShoppingListQuery,
  useRemoveFromListMutation,
} from "../../store/endpoints/seedApi";
import { useGetUserQuery } from "../../store/endpoints/userAPI";
import {
  usePlantedPlantsByUserQuery,
  useUnplantMutation,
} from "../../store/endpoints/plantApi";
import { useGetWeatherQuery } from "../../store/endpoints/weatherApi";
import WeatherWidget from "../dashboard_components/WeatherWidget";
import LoginError from "../error_pages/LoginError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const token = useSelector((state) => state.token.value);
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery(token);
  const userId = user?.id;

  // harvest list
  const [unplant] = useUnplantMutation();
  const {
    data: plants,
    isLoading: plantLoading,
    error: plantError,
  } = usePlantedPlantsByUserQuery({ userId, token });

  const handleUnplant = (id) => {
    unplant({ id, token });
  };

  // shopping list
  const [removeFromList] = useRemoveFromListMutation();
  const {
    data: shoppingList,
    isLoading: listLoading,
    error: listError,
  } = useShoppingListQuery({ token });

  const handleRemove = (id) => {
    removeFromList({ id, token });
  };

  // weather
  const {
    data: weather,
    isLoading: weatherLoading,
    error: weatherError,
  } = useGetWeatherQuery(token);

  let weatherProps = {
    weather: weather,
    user: user,
    token: token,
  };

  // loading & other rendering
  if (listLoading || userLoading || plantLoading || weatherLoading) {
    return <p>Loading ...</p>;
  }
  if (listError || userError || plantError || weatherError) {
    toast("uh oh, something went wrong");
  }

  if (token === undefined) {
    return <LoginError />;
  }

  return (
    <div className="h-[88vh] w-[80vw] absolute right-[.5%] top-[10%]">
      <div className="absolute big-box w-[60%] h-[70%] flex flex-col items-center">
        <WeatherWidget props={weatherProps} />
      </div>
      <div className="absolute big-box w-[30%] h-[38%] right-[5%] flex flex-col items-center">
        <div className="flex items-baseline">
          <p className="text-3xl pt-6 pb-2 w-[100%] text-center">
            Upcoming Harvest
          </p>
          <button onClick={() => navigate("/plants/create")} className="pl-2">
            <img
              src="https://img.icons8.com/sf-ultralight/30/4B5858/plus.png"
              alt="sort"
            />
          </button>
        </div>

        <div className="w-[83%] my-2 overflow-y-scroll h-[70%] scrollbar-none">
          {plants.map((plant) => {
            let today = new Date();
            let harvestDate = new Date(plant.harvest_date);
            let daysToHarvestRaw = harvestDate - today;
            let daysToHarvest = daysToHarvestRaw / (1000 * 3600 * 24);
            let dth = Math.ceil(daysToHarvest);
            return (
              <div
                key={plant.id}
                className="border-b border-lgrey flex content-start items-center py-1"
              >
                <p className="w-[56%] py-2">{plant.nickname}</p>
                <p
                  className={
                    dth > 0 ? "px-2 w-[28%]" : "bg-lgreen px-2 w-[28%]"
                  }
                >
                  {dth > 0 ? `${dth} days` : "Harvesting!"}
                </p>
                <button onClick={() => handleUnplant(plant.id)}>
                  <img
                    src="https://img.icons8.com/sf-ultralight/30/4B5858/radish.png"
                    alt="remove from plant list"
                    className="px-2"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute big-box w-[30%] h-[55%] right-[5%] bottom-[2%] flex flex-col items-center">
        <p className="text-3xl pt-6 w-[100%] text-center">Seed Shopping List</p>
        <div className="w-[83%] my-2 overflow-y-scroll h-[78%] scrollbar-none pb-8">
          {shoppingList.map((item) => (
            <div
              key={item.id}
              className="border-b border-lgrey flex items-center"
            >
              <p className="w-[75%] py-3">{item.nickname}</p>
              <div className="px-2 mt-2">
                <button onClick={() => handleRemove(item.id)}>
                  <img
                    src="https://img.icons8.com/sf-ultralight/30/4B5858/return-purchase.png"
                    alt="remove from list"
                  />
                </button>
              </div>
              <div className="mt-2">
                <a href={item.url} target="_blank" rel="noreferrer">
                  <button>
                    <img
                      src="https://img.icons8.com/sf-ultralight/30/4B5858/checkout.png"
                      alt="purchase"
                    />
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute big-box w-[20vw] h-[19vh] bottom-[3%]"></div>
      <div className="absolute big-box w-[25vw] h-[19vh] bottom-[3%] right-[40%]"></div>
    </div>
  );
}
