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
      toast("Welcome back!");
      navigate("/");
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
        <div className="z-40 border-2 border-dgrey m-16 flex flex-col place-content-center w-[30vw] h-[40vh] big-box justify-self-center">
          <p className="text-3xl m-3 w-100 text-center mb-12">
            Welcome Back to Seediy!
          </p>
          <div className="flex place-content-center items-center">
            <p>Username: </p>
            <input
              type="text"
              name="username"
              onChange={handleUsernameChange}
              value={username}
              className="m-4 box"
            />
          </div>
          <div className="flex place-content-center items-center">
            <p>Password: </p>
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
              value={password}
              className="m-4 box"
            />
          </div>
          <div className="flex place-content-center mt-8">
            <button
              className="button w-[10vw] text-center hover:scale-[102%]"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
