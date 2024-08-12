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
    <div className="absolute right-[.5%] top-[10%] h-[88vh] w-[80vw]">
      <div className="big-box absolute flex h-[70%] w-[60%] flex-col items-center">
        <WeatherWidget props={weatherProps} />
      </div>
      <div className="big-box absolute right-[5%] flex h-[38%] w-[30%] flex-col items-center">
        <div className="flex items-baseline">
          <p className="w-[100%] pb-2 pt-6 text-center text-3xl">
            Upcoming Harvest
          </p>
          <button onClick={() => navigate("/plants/create")} className="pl-2">
            <img
              src="https://img.icons8.com/sf-ultralight/30/4B5858/plus.png"
              alt="sort"
            />
          </button>
        </div>

        <div className="my-2 h-[70%] w-[83%] overflow-y-scroll scrollbar-none">
          {plants.map((plant) => {
            let today = new Date();
            let harvestDate = new Date(plant.harvest_date);
            let daysToHarvestRaw = harvestDate - today;
            let daysToHarvest = daysToHarvestRaw / (1000 * 3600 * 24);
            let dth = Math.ceil(daysToHarvest);
            return (
              <div
                key={plant.id}
                className="flex content-start items-center border-b border-lgrey py-1"
              >
                <p className="w-[56%] py-2">{plant.nickname}</p>
                <p
                  className={
                    dth > 0 ? "w-[28%] px-2" : "w-[28%] bg-lgreen px-2"
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
      <div className="big-box absolute bottom-[2%] right-[5%] flex h-[55%] w-[30%] flex-col items-center">
        <p className="w-[100%] pt-6 text-center text-3xl">Seed Shopping List</p>
        <div className="my-2 h-[78%] w-[83%] overflow-y-scroll pb-8 scrollbar-none">
          {shoppingList.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-lgrey"
            >
              <p className="w-[75%] py-3">{item.nickname}</p>
              <div className="mt-2 px-2">
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
      <div className="big-box absolute bottom-[3%] h-[19vh] w-[20vw]"></div>
      <div className="big-box absolute bottom-[3%] right-[40%] h-[19vh] w-[25vw]"></div>
    </div>
  );
}
