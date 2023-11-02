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
  } = useSeedsByUserQuery(token);

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
      <div className="flex place-content-center items-center h-[100vh] w-[100vw]">
        <LeafyBackground />
        <div className="z-40 border-2 border-dgrey m-16 flex flex-col place-content-center w-[500px] h-[450px] big-box justify-self-center">
          <p className="text-3xl m-3 w-100 text-center mb-8">Add a Planting</p>
          <div className="flex place-content-center items-center my-2">
            <p>Seed: </p>
            <button onClick={() => setSeedDropdown(!seedDropdown)}>
              <div className="flex flex-col divide-y-2 px-2 box w-[250px] max-h-[190px] overflow-scroll scrollbar-thin scrollbar-thumb-orange scrollbar-thumb-rounded-lg">
                <div className="flex justify-between pt-1 px-2 mt-2 mb-0">
                  <p className="text-lg">{seed}</p>
                  <img
                    src="https://img.icons8.com/sf-ultralight/25/4B5858/down-squared.png"
                    alt="drop down arrow"
                  />
                </div>
                {seedDropdown
                  ? seeds.map((s) => {
                      return (
                        <button key={s.id} onClick={() => setSeed(s.id)}>
                          <div className="flex p-2 bg-yellow w-100">
                            <p className="hover:text-orange mt-1 pr-3">
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
              className="m-4 box px-2"
            />
          </div>
          <div className="flex place-content-center items-center">
            <p>Location: </p>
            <input
              type="text"
              name="location"
              onChange={handleLocationChange}
              value={location}
              className="m-4 box px-2"
            />
          </div>

          <div className="flex place-content-center items-center">
            <p>Notes: </p>
            <input
              type="text"
              name="name"
              onChange={handleNotesChange}
              value={notes}
              className="m-4 box px-2"
            />
          </div>
          <div className="flex flex-col place-content-center mt-4">
            <div className="flex place-content-center">
              <button
                className="button w-[20%] text-center hover:scale-[102%]"
                onClick={handleSubmit}
              >
                Add Plant
              </button>
            </div>
          </div>
          <div className="flex place-content-center mt-6">
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
