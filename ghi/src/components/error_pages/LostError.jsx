import LeafyBackground from "../LeafyBackground";
import { useNavigate } from "react-router-dom";
import Leaf from "../../assets/seediy-leaf.svg";

export default function LostError() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-[100vh] w-[100vw] flex-col place-content-center items-center">
        <LeafyBackground />
        <p className="z-40 pb-8 text-5xl">Whoops! You look a bit lost.</p>
        <div className="flex w-[40%] place-content-around">
          <div>
            <img
              src={Leaf}
              alt="dashboard leaf"
              className="relative h-40 rotate-[45deg]"
            />
            <button
              className="absolute left-[48%] top-[52%] z-10 inline text-3xl"
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
