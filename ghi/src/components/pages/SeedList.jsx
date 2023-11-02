import LoginError from "../error_pages/LoginError";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  useSeedsByUserQuery,
  useAddToListMutation,
} from "../../store/endpoints/seedApi";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Leaf from "../../assets/seediy-leaf.svg";

export default function SeedList() {
  // data
  const token = useSelector((state) => state.token.value);
  const {
    data: seeds,
    isLoading: seedsLoading,
    isError: seedsError,
  } = useSeedsByUserQuery(token);
  const [addToList] = useAddToListMutation();

  // handle data

  const handleAddToList = (id) => {
    addToList({ id, token });
  };

  const navigate = useNavigate();

  // handle sorts

  const [seedList, setSeedList] = useState([]);
  const [click, setClick] = useState(false);

  const handleSort = (sort) => {
    const seedArray = [...seeds];
    if (click) {
      setSeedList(seedArray.sort((a, b) => (a[sort] > b[sort] ? 1 : -1)));
    } else {
      setSeedList(seedArray.sort((a, b) => (a[sort] < b[sort] ? 1 : -1)));
    }
    setClick(!click);
  };

  useEffect(() => {
    setSeedList(seeds);
  }, [seeds]);

  // handle icons
  const summerUrl = "https://img.icons8.com/sf-ultralight/25/4B5858/summer.png";
  const fallUrl = "https://img.icons8.com/sf-ultralight/25/4B5858/autumn.png";
  const winterUrl = "https://img.icons8.com/sf-ultralight/25/4B5858/winter.png";
  const springUrl = "https://img.icons8.com/sf-ultralight/25/4B5858/spring.png";
  const wateringCan =
    "https://img.icons8.com/sf-ultralight/25/4B5858/watering-can.png";

  // conditional rendering
  if (seedsLoading) {
    return <p>Loading ...</p>;
  }
  if (seedsError) {
    toast("Uh oh. Something bad happened");
  }
  if (token === undefined) {
    return <LoginError />;
  }

  return (
    <div className="h-[85vh] w-[78vw] absolute right-[2%] top-[10%] big-box flex items-start justify-center">
      <div className="flex flex-col m-4 w-[90%] h-[95%] divide-y-2 divide-dgrey">
        <div className="w-[100%] flex flex-row justify-between">
          <div className="w-[3%]">
            <button onClick={() => handleSort("season")}>
              <img
                src="https://img.icons8.com/sf-ultralight/25/4B5858/sorting-arrows.png"
                alt="sort"
              />
            </button>
          </div>
          <div className="w-[3%]">
            <button onClick={() => handleSort("frost_hardy")}>
              <img
                src="https://img.icons8.com/sf-ultralight/25/4B5858/sorting-arrows.png"
                alt="sort"
              />
            </button>
          </div>
          <div className="w-[20%] text-xl pb-2">
            <div className="flex">
              <p>Seed Name</p>
              <button onClick={() => handleSort("nickname")} className="pl-2">
                <img
                  src="https://img.icons8.com/sf-ultralight/25/4B5858/sorting-arrows.png"
                  alt="sort"
                />
              </button>
              <button
                onClick={() => navigate("/seeds/create")}
                className="pl-2"
              >
                <img
                  src="https://img.icons8.com/sf-ultralight/25/4B5858/plus.png"
                  alt="sort"
                />
              </button>
            </div>
          </div>
          <div className="w-[15%] text-xl pb-2">
            <div className="flex">
              <p>Category</p>
              <button
                onClick={() => handleSort("category_name")}
                className="pl-2"
              >
                <img
                  src="https://img.icons8.com/sf-ultralight/25/4B5858/sorting-arrows.png"
                  alt="sort"
                />
              </button>
              <button onClick={() => navigate("/seeds/type")} className="pl-2">
                <img
                  src="https://img.icons8.com/sf-ultralight/25/4B5858/plus.png"
                  alt="sort"
                />
              </button>
            </div>
          </div>
          <div className="w-[15%] text-xl pb-2">
            <div className="flex">
              <p>Location</p>
              <button
                onClick={() => handleSort("location_name")}
                className="pl-2"
              >
                <img
                  src="https://img.icons8.com/sf-ultralight/25/4B5858/sorting-arrows.png"
                  alt="sort"
                />
              </button>
              <button
                onClick={() => navigate("/seeds/location")}
                className="pl-2"
              >
                <img
                  src="https://img.icons8.com/sf-ultralight/25/4B5858/plus.png"
                  alt="sort"
                />
              </button>
            </div>
          </div>
          <div className="w-[15%] text-xl pb-2">
            <div className="flex">
              <p>Rating</p>
              <button onClick={() => handleSort("rating")} className="pl-2">
                <img
                  src="https://img.icons8.com/sf-ultralight/25/4B5858/sorting-arrows.png"
                  alt="sort"
                />
              </button>
            </div>
          </div>
          <div className="w-[18%] text-xl pb-2">
            <div className="flex">
              <p>Watering Needs</p>
              <button
                onClick={() => handleSort("water_needs")}
                className="pl-2"
              >
                <img
                  src="https://img.icons8.com/sf-ultralight/25/4B5858/sorting-arrows.png"
                  alt="sort"
                />
              </button>
            </div>
          </div>
          <div className="w-[8%] text-xl pb-2">
            <div className="flex">
              <p>Days</p>
              <button
                onClick={() => handleSort("days_to_harvest")}
                className=""
              >
                <img
                  src="https://img.icons8.com/sf-ultralight/25/4B5858/sorting-arrows.png"
                  alt="sort"
                  className="w-[25px]"
                />
              </button>
            </div>
          </div>
          <div className="w-[3.5%]"></div>
          <div className="w-[3.5%]"></div>
          <div className="w-[3.5%]">
            <button onClick={() => handleSort("on_list")} className="pl-2">
              <img
                src="https://img.icons8.com/sf-ultralight/25/4B5858/sorting-arrows.png"
                alt="sort"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col pt-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-lgreen divide-y divide-lgrey">
          {seedList &&
            seedList.map((seed) => {
              let colorClass = `w-auto bg-[${seed?.location_color}] mr-4 px-1 rounded-lg text-center`;
              return (
                <div key={seed.id} className="flex flex-row py-2 items-center">
                  <div className="w-[3%]">
                    <img
                      src={
                        seed.season === "summer"
                          ? summerUrl
                          : seed.season === "fall"
                          ? fallUrl
                          : seed.season === "winter"
                          ? winterUrl
                          : springUrl
                      }
                      alt="season"
                    />
                  </div>
                  <div className="w-[3%]">
                    {seed.frost_hardy ? (
                      <img src={winterUrl} alt="snowflake" />
                    ) : null}
                  </div>
                  <div className="w-[20%]">{seed.nickname}</div>
                  <div className="w-[15%]">{seed.category_name}</div>
                  <div className="w-[15%]">
                    <p className={colorClass}>{seed.location_name}</p>
                  </div>
                  <div className="w-[15%]">
                    {seed.rating === 5 ? (
                      <div className="flex">
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                      </div>
                    ) : seed.rating === 4 ? (
                      <div className="flex">
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                      </div>
                    ) : seed.rating === 3 ? (
                      <div className="flex">
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                      </div>
                    ) : seed.rating === 2 ? (
                      <div className="flex">
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                      </div>
                    ) : (
                      <div className="flex">
                        <img src={Leaf} alt="leaf" className="h-[25px]" />
                      </div>
                    )}
                  </div>
                  <div className="w-[18%]">
                    {seed.water_needs === 5 ? (
                      <div className="flex">
                        <img src={wateringCan} alt="watering can" />
                        <img src={wateringCan} alt="watering can" />
                        <img src={wateringCan} alt="watering can" />
                        <img src={wateringCan} alt="watering can" />
                        <img src={wateringCan} alt="watering can" />
                      </div>
                    ) : seed.water_needs === 4 ? (
                      <div className="flex">
                        <img src={wateringCan} alt="watering can" />
                        <img src={wateringCan} alt="watering can" />
                        <img src={wateringCan} alt="watering can" />
                        <img src={wateringCan} alt="watering can" />
                      </div>
                    ) : seed.water_needs === 3 ? (
                      <div className="flex">
                        <img src={wateringCan} alt="watering can" />
                        <img src={wateringCan} alt="watering can" />
                        <img src={wateringCan} alt="watering can" />
                      </div>
                    ) : seed.water_needs === 2 ? (
                      <div className="flex">
                        <img src={wateringCan} alt="watering can" />
                        <img src={wateringCan} alt="watering can" />
                      </div>
                    ) : (
                      <div className="flex">
                        <img src={wateringCan} alt="watering can" />
                      </div>
                    )}
                  </div>
                  <div className="w-[8%] pl-1">{seed.days_to_harvest}</div>
                  <div className="w-[3.5%] h-[30px]">
                    <img
                      src="https://img.icons8.com/sf-ultralight/30/4B5858/overview-pages-1.png"
                      alt="notes"
                    />
                  </div>
                  <div className="w-[3.5%] h-[30px]">
                    <img
                      src="https://img.icons8.com/sf-ultralight/30/4B5858/pencil.png"
                      alt="edit"
                    />
                  </div>
                  <div className="w-[3%] h-[30px]">
                    {seed.on_list ? null : (
                      <button onClick={() => handleAddToList(seed.id)}>
                        <img
                          src="https://img.icons8.com/sf-ultralight/30/4B5858/add-shopping-cart.png"
                          alt="add to cart"
                        />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
