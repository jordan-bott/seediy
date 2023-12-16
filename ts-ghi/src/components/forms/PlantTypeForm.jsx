import { useAddPlantTypeMutation } from "../../store/endpoints/plantTypeApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import LeafyBackground from "../LeafyBackground";

export default function PlantTypeForm() {
  const token = useSelector((state) => state.token.value);
  const [addPlantType] = useAddPlantTypeMutation();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
    };
    const response = await addPlantType({
      info: data,
      token: token,
    });
    if (!response.error) {
      setName("");
      toast("Category Added!");
    } else {
      toast("Something went wrong.");
    }
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  return (
    <div>
      <div className="flex place-content-center items-center h-[100vh] w-[100vw]">
        <LeafyBackground />
        <div className="z-40 border-2 border-dgrey m-16 flex flex-col place-content-center w-[500px] h-[375px] big-box justify-self-center">
          <p className="text-3xl m-3 w-100 text-center mb-8">
            Add a Plant Category
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
          </div>
          <div className="flex flex-col place-content-center mt-8">
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
