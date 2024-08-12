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
      <div className="flex h-[100vh] w-[100vw] place-content-center items-center">
        <LeafyBackground />
        <div className="big-box z-40 m-16 flex h-[375px] w-[500px] flex-col place-content-center justify-self-center border-2 border-dgrey">
          <p className="w-100 m-3 mb-8 text-center text-3xl">
            Add a Plant Category
          </p>
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
          <div className="mt-8 flex flex-col place-content-center">
            <div className="flex place-content-center">
              <button
                className="button w-[20%] text-center hover:scale-[102%]"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-6 flex place-content-center">
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
