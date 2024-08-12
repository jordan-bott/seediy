import { usePlantTypeByUserQuery } from "../../store/endpoints/plantTypeApi";
import { useSeedStorageByUserQuery } from "../../store/endpoints/seedStorageApi";
import { useAddSeedMutation } from "../../store/endpoints/seedApi";
import { useGetUserQuery } from "../../store/endpoints/userAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import LeafyBackground from "../LeafyBackground";

export default function SeedForm() {
  const token = useSelector((state) => state.token.value);
  const [addSeed] = useAddSeedMutation();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery(token);
  const userId = user?.id;
  const {
    data: plantTypes,
    isLoading: plantTypeLoading,
    isError: plantTypeError,
  } = usePlantTypeByUserQuery({ userId, token });
  const {
    data: seedStorages,
    isLoading: seedStorageLoading,
    isError: seedStorageError,
  } = useSeedStorageByUserQuery({ userId, token });

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [days, setDays] = useState(0);
  const [frostHardy, setFrostHardy] = useState(false);
  const [season, setSeason] = useState("");
  const [waterNeeds, setWaterNeeds] = useState(0);
  const [rating, setRating] = useState(0);
  const [brand, setBrand] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [plantType, setPlantType] = useState("");
  const [plantTypeName, setPlantTypeName] = useState("");
  const [storage, setStorage] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      nickname: nickname,
      quantity: quantity,
      days_to_harvest: days,
      frost_hardy: frostHardy,
      season: season,
      water_needs: waterNeeds,
      rating: rating,
      brand: brand,
      url: url,
      category: category,
      plant_type_id: plantType,
      seed_storage_id: storage,
      notes: notes,
    };
    const response = await addSeed({
      info: data,
      token: token,
    });
    if (!response.error) {
      setName("");
      setNickname("");
      setQuantity(0);
      setDays(0);
      setFrostHardy(false);
      setSeason("");
      setWaterNeeds(1);
      setRating(1);
      setBrand("");
      setUrl("");
      setCategory("");
      setPlantType(0);
      setStorage(0);
      setNotes("");
      toast("Seed Added!");
    } else {
      toast("Something went wrong.");
    }
  };

  // handle dropdowns

  const [seasonDropdown, setSeasonDropdown] = useState(false);
  const seasonArray = ["spring", "summer", "fall", "winter"];

  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const categoryArray = [
    "vegetable",
    "fruit",
    "edible flowers",
    "ornamentals",
    "house plants",
  ];

  const [plantTypeDropdown, setPlantTypeDropdown] = useState(false);
  const [seedStorageDropdown, setSeedStorageDropdown] = useState(false);

  // handle state

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleNicknameChange = (event) => {
    const value = event.target.value;
    setNickname(value);
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
  };

  const handleDaysChange = (event) => {
    const value = event.target.value;
    setDays(value);
  };

  const handleFrostHardyChange = () => {
    setFrostHardy(!frostHardy);
  };

  const handleWaterNeedsChange = (event) => {
    const value = event.target.value;
    setWaterNeeds(value);
  };

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setRating(value);
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    setBrand(value);
  };

  const handleUrlChange = (event) => {
    const value = event.target.value;
    setUrl(value);
  };

  const handleNotesChange = (event) => {
    const value = event.target.value;
    setNotes(value);
  };

  const handlePlantTypeChange = (type) => {
    setPlantType(type.id);
    setPlantTypeName(type.name);
  };

  // conditional rendering

  if (userLoading || plantTypeLoading || seedStorageLoading) {
    return <p>Loading ...</p>;
  }

  if (userError || plantTypeError || seedStorageError) {
    toast("Uh oh, something bad happened");
  }

  return (
    <div>
      <div className="flex h-[100vh] w-[100vw] place-content-center items-center">
        <LeafyBackground />
        <div className="big-box z-40 m-16 flex h-[700px] w-[855px] flex-col place-content-center justify-self-center border-2 border-dgrey">
          <p className="w-100 m-3 mb-8 text-center text-3xl">Add a New Seed!</p>
          <div className="flex">
            <div className="ml-8 flex flex-col items-end">
              <div className="flex place-content-center items-center">
                <p>Name: </p>
                <input
                  type="text"
                  name="name"
                  onChange={handleNameChange}
                  value={name}
                  className="box m-4 px-2"
                />
              </div>
              <div className="flex place-content-center items-center">
                <p>Nickname: </p>
                <input
                  type="text"
                  name="name"
                  onChange={handleNicknameChange}
                  value={nickname}
                  className="box m-4 px-2"
                />
              </div>
              <div className="flex place-content-center items-center">
                <p>Quantity: </p>
                <input
                  type="number"
                  name="quantity"
                  onChange={handleQuantityChange}
                  value={quantity}
                  className="box m-4 px-2"
                />
              </div>
              <div className="flex place-content-center items-center">
                <p>Days To Harvest: </p>
                <input
                  type="number"
                  name="days"
                  onChange={handleDaysChange}
                  value={days}
                  className="box m-4 px-2"
                />
              </div>
              <div className="flex place-content-center items-center">
                <p>Frost Hardy: </p>
                <input
                  type="checkbox"
                  name="frostHardy"
                  onChange={handleFrostHardyChange}
                  value={frostHardy}
                  className="box m-4 px-2"
                />
              </div>
              <div className="my-2 flex place-content-center items-center">
                <p>Season: </p>
                <button onClick={() => setSeasonDropdown(!seasonDropdown)}>
                  <div className="box scrollbar-thumb-orange ml-2 flex max-h-[190px] w-[250px] flex-col divide-y-2 overflow-scroll px-2 scrollbar-thin scrollbar-thumb-rounded-lg">
                    <div className="mt-1 flex h-5 items-start justify-between px-2">
                      <p className="text-m">{season}</p>
                      <img
                        src="https://img.icons8.com/sf-ultralight/25/4B5858/down-squared.png"
                        alt="drop down arrow"
                      />
                    </div>
                    {seasonDropdown
                      ? seasonArray.map((s) => {
                          return (
                            <button key={s} onClick={() => setSeason(s)}>
                              <div className="w-100 flex p-2">
                                <p className="mt-1 pr-3 hover:text-lgreen">
                                  {s}
                                </p>
                              </div>
                            </button>
                          );
                        })
                      : null}
                  </div>
                </button>
              </div>
              <div className="my-2 flex place-content-center items-center">
                <p>Category: </p>
                <button onClick={() => setCategoryDropdown(!categoryDropdown)}>
                  <div className="box scrollbar-thumb-orange ml-2 flex max-h-[190px] w-[250px] flex-col divide-y-2 overflow-scroll px-2 scrollbar-thin scrollbar-thumb-rounded-lg">
                    <div className="mt-1 flex h-5 items-start justify-between px-2">
                      <p className="text-m">{category}</p>
                      <img
                        src="https://img.icons8.com/sf-ultralight/25/4B5858/down-squared.png"
                        alt="drop down arrow"
                      />
                    </div>
                    {categoryDropdown
                      ? categoryArray.map((c) => {
                          return (
                            <button key={c} onClick={() => setCategory(c)}>
                              <div className="w-100 flex p-2">
                                <p className="mt-1 pr-3 hover:text-lgreen">
                                  {c}
                                </p>
                              </div>
                            </button>
                          );
                        })
                      : null}
                  </div>
                </button>
              </div>
            </div>
            <div className="ml-8 flex flex-col items-start">
              <div className="my-2 flex place-content-center items-center">
                <p>Plant Type: </p>
                <button
                  onClick={() => setPlantTypeDropdown(!plantTypeDropdown)}
                >
                  <div className="box scrollbar-thumb-orange ml-2 flex max-h-[190px] w-[250px] flex-col divide-y-2 overflow-scroll px-2 scrollbar-thin scrollbar-thumb-rounded-lg">
                    <div className="mt-1 flex h-5 items-start justify-between px-2">
                      <p className="text-m">
                        {plantTypeName != ""
                          ? plantTypeName
                          : "Select a plant Type"}
                      </p>
                      <img
                        src="https://img.icons8.com/sf-ultralight/25/4B5858/down-squared.png"
                        alt="drop down arrow"
                      />
                    </div>
                    {plantTypeDropdown
                      ? plantTypes &&
                        plantTypes.map((c) => {
                          return (
                            <button
                              key={c.id}
                              onClick={() => handlePlantTypeChange(c)}
                            >
                              <div className="w-100 flex p-2">
                                <p className="mt-1 pr-3 hover:text-lgreen">
                                  {c.name}
                                </p>
                              </div>
                            </button>
                          );
                        })
                      : null}
                  </div>
                </button>
              </div>

              <div className="my-2 flex place-content-center items-center">
                <p>Seed Storage: </p>
                <button
                  onClick={() => setSeedStorageDropdown(!seedStorageDropdown)}
                >
                  <div className="box scrollbar-thumb-orange ml-2 flex max-h-[190px] w-[250px] flex-col divide-y-2 overflow-scroll px-2 scrollbar-thin scrollbar-thumb-rounded-lg">
                    <div className="mt-1 flex h-5 items-start justify-between px-2">
                      <p className="text-m">{storage}</p>
                      <img
                        src="https://img.icons8.com/sf-ultralight/25/4B5858/down-squared.png"
                        alt="drop down arrow"
                      />
                    </div>
                    {seedStorageDropdown
                      ? seedStorages &&
                        seedStorages.map((s) => {
                          return (
                            <button key={s.id} onClick={() => setStorage(s.id)}>
                              <div className="w-100 flex p-2">
                                <p className="mt-1 pr-3 hover:text-lgreen">
                                  {s.name}
                                </p>
                              </div>
                            </button>
                          );
                        })
                      : null}
                  </div>
                </button>
              </div>
              <div className="flex place-content-center items-center">
                <p>Notes: </p>
                <input
                  type="text"
                  name="name"
                  onChange={handleNotesChange}
                  value={notes}
                  className="box m-4 px-2"
                />
              </div>

              <div>
                <div className="relative ml-4 flex place-content-start items-center">
                  <p className="pl-3">Water Needs:</p>
                  <input
                    type="number"
                    name="waterNeeds"
                    onChange={handleWaterNeedsChange}
                    value={waterNeeds}
                    min="1"
                    max="5"
                    className="box m-4 px-2"
                  />
                </div>
              </div>
              <div>
                <div className="relative ml-4 flex place-content-start items-center">
                  <p className="pl-3">Rating:</p>
                  <input
                    type="number"
                    name="rating"
                    onChange={handleRatingChange}
                    value={rating}
                    min="1"
                    max="5"
                    className="box m-4 px-2"
                  />
                </div>
              </div>
              <div>
                <div className="relative ml-4 flex place-content-start items-center">
                  <p className="pl-3">Brand:</p>
                  <input
                    type="text"
                    name="brand"
                    onChange={handleBrandChange}
                    value={brand}
                    className="box m-4 px-2"
                  />
                </div>
              </div>
              <div>
                <div className="relative ml-4 flex place-content-start items-center">
                  <p className="pl-3">Purchase URL:</p>
                  <input
                    type="url"
                    name="url"
                    onChange={handleUrlChange}
                    value={url}
                    className="box m-4 px-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col place-content-center">
            <div className="flex place-content-center">
              <button
                className="button w-[15vw] text-center hover:scale-[102%]"
                onClick={handleSubmit}
              >
                Add Seed to Collection
              </button>
            </div>
            <div className="mt-3 flex place-content-center">
              <button
                className="hover:text-dgreen"
                onClick={() => navigate("/seeds")}
              >
                Go Back to Seed List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
