import LeafyBackground from "../LeafyBackground";
import { useNavigate } from "react-router-dom";
import Leaf from "../../assets/seediy-leaf.svg";

export default function LostError() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col place-content-center items-center h-[100vh] w-[100vw]">
        <LeafyBackground />
        <p className="text-5xl z-40 pb-8">Whoops! You look a bit lost.</p>
        <div className="flex place-content-around w-[40%]">
          <div>
            <img
              src={Leaf}
              alt="dashboard leaf"
              className="relative h-40 rotate-[45deg]"
            />
            <button
              className="inline absolute text-3xl left-[48%] top-[52%] z-10"
              onClick={() => navigate("/dashboard")}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
