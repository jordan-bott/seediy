import { useSeedsByUserQuery } from "../../store/endpoints/seedApi";
import { useAddPlantMutation } from "../../store/endpoints/plantApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import LeafyBackground from "../LeafyBackground";

export default function AddPlanting() {
  const token = useSelector((state) => state.token.value);
  const [addPlant] = useAddPlantMutation();
  const [seed, setSeed] = useState(0);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const {
    data: seeds,
    isLoading: seedLoading,
    isError: seedError,
  } = useSeedsByUserQuery();

  const [seedDropdown, setSeedDropdown] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      seed_id: seed,
      date_planted: date,
      location: location,
      notes: notes,
    };
    const response = await addPlant({
      info: data,
      token: token,
    });
    if (!response.error) {
      setSeed(0);
      setDate("");
      setLocation("");
      setNotes("");
      toast("Plant Added!");
    } else {
      toast("Something went wrong.");
    }
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  const handleNotesChange = (event) => {
    const value = event.target.value;
    setNotes(value);
  };

  // conditional rendering

  if (seedLoading) {
    return <p>Loading ...</p>;
  }

  if (seedError) {
    toast("Uh oh, something bad happened.");
  }

  return (
    <div>
      <div className="flex h-[100vh] w-[100vw] place-content-center items-center">
        <LeafyBackground />
        <div className="big-box z-40 m-16 flex h-[450px] w-[500px] flex-col place-content-center justify-self-center border-2 border-dgrey">
          <p className="w-100 m-3 mb-8 text-center text-3xl">Add a Planting</p>
          <div className="my-2 flex place-content-center items-center">
            <p>Seed: </p>
            <button onClick={() => setSeedDropdown(!seedDropdown)}>
              <div className="box scrollbar-thumb-orange ml-2 flex max-h-[190px] w-[250px] flex-col divide-y-2 overflow-scroll px-2 scrollbar-thin scrollbar-thumb-rounded-lg">
                <div className="mt-1 flex h-5 items-start justify-between px-2">
                  <p className="text-m">{seed}</p>
                  <img
                    src="https://img.icons8.com/sf-ultralight/25/4B5858/down-squared.png"
                    alt="drop down arrow"
                  />
                </div>
                {seeds && seedDropdown
                  ? seeds.map((s) => {
                      return (
                        <button key={s.id} onClick={() => setSeed(s.id)}>
                          <div className="w-100 flex p-2">
                            <p className="mt-1 pr-3 hover:text-lgreen">
                              {s.nickname}
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
            <p>Date Planted: </p>
            <input
              type="date"
              name="date"
              onChange={handleDateChange}
              value={date}
              className="box m-4 px-2"
            />
          </div>
          <div className="flex place-content-center items-center">
            <p>Location: </p>
            <input
              type="text"
              name="location"
              onChange={handleLocationChange}
              value={location}
              className="box m-4 px-2"
            />
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
          <div className="mt-4 flex flex-col place-content-center">
            <div className="flex place-content-center">
              <button
                className="button w-[20%] text-center hover:scale-[102%]"
                onClick={handleSubmit}
              >
                Add Plant
              </button>
            </div>
          </div>
          <div className="mt-6 flex place-content-center">
            <button
              className="hover:text-dgreen"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
