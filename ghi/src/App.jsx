import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Signup from "./components/pages/SignUp";
import AdminSignup from "./components/pages/AdminSignUp";
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
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
