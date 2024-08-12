import NavImage from "./NavImage";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import seediyLogo from "../assets/seediy-logo.svg";
import { useLogoutMutation } from "../store/apiSlice";
import { toast } from "react-toastify";
import { set } from "../store/tokenSlice";
import { useSelector, useDispatch } from "react-redux";

export default function NavBar() {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    toast("See you again soon!");
    navigate("/login");
    dispatch(set(undefined));
  };

  return (
    <>
      <div className="absolute -top-[2%] right-[1%] flex items-end">
        <button onClick={() => navigate("/dashboard")}>
          <img src={seediyLogo} alt="logo" className="w-[10vw]" />
        </button>
        {token ? (
          <>
            <button className="pb-[5%]">
              <img
                src="https://img.icons8.com/sf-ultralight/50/4B5858/admin-settings-male.png"
                alt="user settings icon"
              />
            </button>
            <button className="pb-[5%]" onClick={() => handleLogout()}>
              <img
                src="https://img.icons8.com/sf-ultralight/50/exit.png"
                alt="logout icon"
              />
            </button>
          </>
        ) : null}
      </div>
      {token ? (
        <div className="absolute left-[.5%] top-[-1%] z-50 h-[100vh] overflow-y-hidden">
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
      ) : null}
    </>
  );
}
