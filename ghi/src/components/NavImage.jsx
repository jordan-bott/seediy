import homeNav from "../assets/nav/home-nav.svg";
import seedNav from "../assets/nav/seed-nav.svg";
import instaseedNav from "../assets/nav/instaseed-nav.svg";
import blogNav from "../assets/nav/blog-nav.svg";
import gardenNav from "../assets/nav/garden-nav.svg";
import harvestNav from "../assets/nav/harvest-nav.svg";
import weatherNav from "../assets/nav/weather-nav.svg";

export default function NavImage(pathname) {
  const path = pathname.props;
  if (path === "/dashboard") {
    return (
      <div className="h-[100vh] overflow-y-hidden flex align-center">
        <img
          className="h-[110vh] overflow-hidden"
          src={homeNav}
          alt="nav bar"
        />
      </div>
    );
  }
  if (path === "/seeds") {
    return (
      <div className="h-[100vh] overflow-y-hidden flex align-center">
        <img
          className="h-[110vh] overflow-hidden"
          src={seedNav}
          alt="nav bar"
        />
      </div>
    );
  }
  if (path === "/instaseed") {
    return (
      <div className="h-[100vh] overflow-y-hidden flex align-center">
        <img
          className="h-[110vh] overflow-hidden"
          src={instaseedNav}
          alt="nav bar"
        />
      </div>
    );
  }
  if (path === "/blogs") {
    return (
      <div className="h-[100vh] overflow-y-hidden flex align-center">
        <img
          className="h-[110vh] overflow-hidden"
          src={blogNav}
          alt="nav bar"
        />
      </div>
    );
  }
  if (path === "/garden") {
    return (
      <div className="h-[100vh] overflow-y-hidden flex align-center">
        <img
          className="h-[110vh] overflow-hidden"
          src={gardenNav}
          alt="nav bar"
        />
      </div>
    );
  }
  if (path === "/harvest") {
    return (
      <div className="h-[100vh] overflow-y-hidden flex align-center">
        <img
          className="h-[110vh] overflow-hidden"
          src={harvestNav}
          alt="nav bar"
        />
      </div>
    );
  }
  if (path === "/weather") {
    return (
      <div className="h-[100vh] overflow-y-hidden flex align-center">
        <img
          className="h-[110vh] overflow-hidden"
          src={weatherNav}
          alt="nav bar"
        />
      </div>
    );
  }
}
