import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
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
              backgroundColor: "#fff5db",
              color: "#79aadd",
              fontFamily: "Mooli",
              border: "2px solid #79aadd ",
              borderRadius: "5px",
              marginBottom: "50px",
            }}
          />
          <NavBar />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
