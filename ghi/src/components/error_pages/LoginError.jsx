import LeafyBackground from "../LeafyBackground";
import { useNavigate } from "react-router-dom";
import Leaf from "../../assets/seediy-leaf.svg";

export default function LoginError() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col place-content-center items-center h-[100vh] w-[100vw]">
        <LeafyBackground />
        <p className="text-5xl z-40 pb-8">
          Uh oh! Looks like you are not logged in.
        </p>
        <div className="flex place-content-around w-[40%]">
          <div>
            <img
              src={Leaf}
              alt="login leaf"
              className="relative h-40 rotate-[45deg]"
            />
            <button
              className="inline absolute text-3xl left-[58%] top-[52%] z-10"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
          <div>
            <img
              src={Leaf}
              alt="signup leaf"
              className="relative h-40 rotate-[45deg]"
            />
            <button
              className="inline absolute text-3xl left-[37.5%] top-[52%] z-10"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
