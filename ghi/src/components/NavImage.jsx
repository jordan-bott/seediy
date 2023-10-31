import homeNav from "../nav-assets/home-nav.svg";
import seedNav from "../nav-assets/seed-nav.svg";
import instaseedNav from "../nav-assets/instaseed-nav.svg";
import blogNav from "../nav-assets/blog-nav.svg";
import gardenNav from "../nav-assets/garden-nav.svg";
import harvestNav from "../nav-assets/harvest-nav.svg";
import weatherNav from "../nav-assets/weather-nav.svg";

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
