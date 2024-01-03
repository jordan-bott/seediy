import { useAddSeedStorageMutation } from "../../store/endpoints/seedStorageApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import LeafyBackground from "../LeafyBackground";

export default function LocationForm() {
  const token = useSelector((state) => state.token.value);
  const [addStorage] = useAddSeedStorageMutation();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#DFC5FE");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      color: color,
      notes: notes,
    };
    const response = await addStorage({
      info: data,
      token: token,
    });
    if (!response.error) {
      setName("");
      setColor("#DFC5FE");
      setNotes("");
      toast("Location Added!");
    } else {
      toast("Something went wrong.");
    }
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleNotesChange = (event) => {
    const value = event.target.value;
    setNotes(value);
  };

  return (
    <div>
      <div className="flex place-content-center items-center h-[100vh] w-[100vw]">
        <LeafyBackground />
        <div className="z-40 border-2 border-dgrey m-16 flex flex-col place-content-center w-[500px] h-[375px] big-box justify-self-center">
          <p className="text-3xl m-3 w-100 text-center mb-8">
            Add a Storage Location
          </p>
          <div className="flex place-content-center items-center">
            <p>Name: </p>
            <input
              type="text"
              name="name"
              onChange={handleNameChange}
              value={name}
              className="m-4 box px-2"
            />
            <p>Color: </p>
            <input
              type="color"
              name="name"
              onChange={handleColorChange}
              value={color}
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
                Add
              </button>
            </div>
          </div>
          <div className="flex place-content-center mt-6">
            <button
              className="hover:text-dgreen"
              onClick={() => navigate("/seeds")}
            >
              Back to Seed List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
