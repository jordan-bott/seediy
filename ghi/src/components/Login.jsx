import { useDispatch } from "react-redux";
import { useLoginMutation } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { set } from "../store/tokenSlice";
import LeafyBackground from "./LeafyBackground";

export default function Login() {
  const [loginUser] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginResponse = await loginUser({
      username: username,
      password: password,
    });
    if (!loginResponse.error) {
      setUsername("");
      setPassword("");
      toast("Welcome back! 🌱");
      navigate("/dashboard");
    } else {
      toast("Incorrect username or password");
    }
    dispatch(set(loginResponse.data.access_token));
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <div>
      <div className="flex place-content-center items-center h-[100vh] w-[100vw]">
        <LeafyBackground />
        <div className="z-40 border-2 border-dgrey m-16 flex flex-col place-content-center w-[500px] h-[375px] big-box justify-self-center">
          <p className="text-3xl m-3 w-100 text-center mb-8">
            Welcome Back to Seediy!
          </p>
          <div className="flex place-content-center items-center">
            <p>Username: </p>
            <input
              type="text"
              name="username"
              onChange={handleUsernameChange}
              value={username}
              className="m-4 box px-2"
            />
          </div>
          <div className="relative flex place-content-center items-center">
            <p>Password: </p>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              onChange={handlePasswordChange}
              value={password}
              className="m-4 box px-2"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="h-[25px] w-[25px] absolute right-[22.5%]"
            >
              <img
                src={
                  showPass
                    ? "https://img.icons8.com/sf-ultralight/25/000000/invisible.png"
                    : "https://img.icons8.com/sf-ultralight/25/000000/visible.png"
                }
                alt="show/hide password"
              />
            </button>
          </div>
          <div className="flex flex-col place-content-center mt-8">
            <div className="flex place-content-center">
              <button
                className="button w-[10vw] text-center hover:scale-[102%]"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="flex place-content-center mt-3">
              <p>
                Not growing with us yet?{" "}
                <button
                  className="hover:text-dgreen"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up!
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
