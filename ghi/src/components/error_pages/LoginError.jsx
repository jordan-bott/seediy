import LeafyBackground from "../LeafyBackground";
import { useNavigate } from "react-router-dom";
import Leaf from "../../assets/seediy-leaf.svg";

export default function LoginError() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-[100vh] w-[100vw] flex-col place-content-center items-center">
        <LeafyBackground />
        <p className="z-40 pb-8 text-5xl">
          Uh oh! Looks like you are not logged in.
        </p>
        <div className="flex w-[40%] place-content-around">
          <div>
            <img
              src={Leaf}
              alt="login leaf"
              className="relative h-40 rotate-[45deg]"
            />
            <button
              className="absolute left-[58%] top-[52%] z-10 inline text-3xl"
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
              className="absolute left-[37.5%] top-[52%] z-10 inline text-3xl"
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
