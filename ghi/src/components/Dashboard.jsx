import { useSelector } from "react-redux";
import {
  useShoppingListQuery,
  useRemoveFromListMutation,
} from "../store/endpoints/seedApi";
import { useGetUserQuery } from "../store/endpoints/userAPI";
import { usePlantedPlantsByUserQuery } from "../store/endpoints/plantApi";
import { toast } from "react-toastify";

export default function Dashboard() {
  const token = useSelector((state) => state.token.value);
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery(token);
  const userId = userData?.id;
  const {
    data: plants,
    isLoading: plantLoading,
    error: plantError,
  } = usePlantedPlantsByUserQuery({ userId, token });
  console.log(plants);
  // shopping list
  const [removeFromList] = useRemoveFromListMutation();
  const {
    data: shoppingList,
    isLoading: listLoading,
    error: listError,
  } = useShoppingListQuery({ token });

  if (listLoading || userLoading || plantLoading) {
    return <p>Loading ...</p>;
  }
  if (listError || userError || plantError) {
    toast("uh oh, error getting your shopping list");
  }

  const handleRemove = (id) => {
    removeFromList({ id, token });
  };

  return (
    <div className="h-[88vh] w-[80vw] absolute right-[.5%] top-[10%]">
      <div className="absolute big-box w-[60%] h-[70%]">Weather Box</div>
      <div className="absolute big-box w-[30%] h-[38%] right-[5%] flex flex-col items-center">
        <p className="text-3xl pt-6 w-[100%] text-center">Upcoming Harvest</p>
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
                <p className="w-[56%] py-2">{plant.location}</p>
                <p className={dth > 0 ? "px-2" : "bg-lgreen px-2"}>
                  {dth > 0 ? `${dth} days` : "Harvesting!"}
                </p>
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
      <div className="absolute big-box w-[20vw] h-[19vh] bottom-[3%]">
        Water Box
      </div>
      <div className="absolute big-box w-[25vw] h-[19vh] bottom-[3%] right-[40%]">
        Water Box
      </div>
    </div>
  );
}
