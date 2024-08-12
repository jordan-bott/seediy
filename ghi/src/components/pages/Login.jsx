import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { set } from "../../store/tokenSlice";
import LeafyBackground from "../LeafyBackground";

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
      document.cookie = loginResponse.data.access_token;
      dispatch(set(loginResponse.data.access_token));
      toast("Welcome back! 🌱");
      navigate("/dashboard");
    } else {
      toast("Incorrect username or password");
    }
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
      <div className="flex h-[100vh] w-[100vw] place-content-center items-center">
        <LeafyBackground />
        <div className="big-box z-40 m-16 flex h-[375px] w-[500px] flex-col place-content-center justify-self-center border-2 border-dgrey">
          <p className="w-100 m-3 mb-8 text-center text-3xl">
            Welcome Back to Seediy!
          </p>
          <div className="flex place-content-center items-center">
            <p>Username: </p>
            <input
              type="text"
              name="username"
              onChange={handleUsernameChange}
              value={username}
              className="box m-4 px-2"
            />
          </div>
          <div className="relative flex place-content-center items-center">
            <p>Password: </p>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              onChange={handlePasswordChange}
              value={password}
              className="box m-4 px-2"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-[22.5%] h-[25px] w-[25px]"
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
          <div className="mt-8 flex flex-col place-content-center">
            <div className="flex place-content-center">
              <button
                className="button w-[10vw] text-center hover:scale-[102%]"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="mt-3 flex place-content-center">
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
