import NavImage from "./NavImage";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  let { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="absolute left-[.5%] top-[-1%] overflow-y-hidden h-[100vh]">
      <NavImage className="" props={pathname} />
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute left-[55%] top-[10.75%] hover:text-dgreen"
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate("/seeds")}
        className="absolute left-[16%] top-[23.5%] hover:text-dgreen"
      >
        Seeds
      </button>
      <button
        onClick={() => navigate("/instaseed")}
        className="absolute left-[65%] top-[36%] hover:text-dgreen"
      >
        InstaSeed
      </button>
      <button
        onClick={() => navigate("/blogs")}
        className="absolute left-[18%] top-[49%] hover:text-dgreen"
      >
        Blogs
      </button>
      <button
        onClick={() => navigate("/garden")}
        className="absolute left-[65.5%] top-[62.25%] hover:text-dgreen"
      >
        Garden <br></br>Layout
      </button>
      <button
        onClick={() => navigate("/harvest")}
        className="absolute left-[16%] top-[74%] hover:text-dgreen"
      >
        Harvest <br></br> Tracker
      </button>
      <button
        onClick={() => navigate("/weather")}
        className="absolute left-[65%] top-[89.75%] hover:text-dgreen"
      >
        Weather
      </button>
    </div>
  );
}
