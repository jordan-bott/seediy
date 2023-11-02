import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Signup from "./components/pages/SignUp";
import AdminSignup from "./components/pages/AdminSignUp";
import SeedList from "./components/pages/SeedList";
import Instaseed from "./components/pages/Instaseed";
import Blogs from "./components/pages/Blogs";
import GardenLayout from "./components/pages/GardenLayout";
import HarvestTracker from "./components/pages/HarvestTracker";
import Weather from "./components/pages/Weather";
import PlantTypeForm from "./components/forms/PlantTypeForm";
import LocationForm from "./components/forms/LocationForm";
import SeedForm from "./components/forms/SeedForm";
import AddPlanting from "./components/forms/AddPlanting";
import LostError from "./components/error_pages/LostError";
import NavBar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="h-screen overflow-y-hidden">
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastStyle={{
              backgroundColor: "#eaf2cf",
              color: "#4b5858",
              fontFamily: "Mooli",
              border: "2px solid #cbd081",
              borderRadius: "5px",
              marginBottom: "40px",
            }}
          />
          <NavBar />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin">
              <Route path="signup" element={<AdminSignup />} />
            </Route>
            <Route path="seeds">
              <Route index element={<SeedList />} />
              <Route path="create" element={<SeedForm />} />
              <Route path="type" element={<PlantTypeForm />} />
              <Route path="location" element={<LocationForm />} />
            </Route>
            <Route path="instaseed">
              <Route index element={<Instaseed />} />
            </Route>
            <Route path="blogs">
              <Route index element={<Blogs />} />
            </Route>
            <Route path="garden" element={<GardenLayout />} />
            <Route path="plants">
              <Route index element={<HarvestTracker />} />
              <Route path="create" element={<AddPlanting />} />
            </Route>
            <Route path="weather" element={<Weather />} />
            <Route path="*" element={<LostError />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
