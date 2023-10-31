import { useDispatch } from "react-redux";
import { useLoginMutation, useSignupMutation } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { set } from "../store/tokenSlice";
import LeafyBackground from "./LeafyBackground";

export default function Signup() {
  const [loginUser] = useLoginMutation();
  const [signupUser] = useSignupMutation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [firstFrost, setFirstFrost] = useState("");
  const [lastFrost, setLastFrost] = useState("");
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password === passwordConf) {
      const signupResponse = await signupUser({
        username: username,
        email: email,
        password: password,
        password_conf: passwordConf,
        zipcode: zipcode,
        first_frost: firstFrost,
        last_frost: lastFrost,
      });
      if (!signupResponse.error) {
        setEmail("");
        setPasswordConf("");
        setZipcode("");
        setFirstFrost("");
        setLastFrost("");

        const loginResponse = await loginUser({
          username: username,
          password: password,
        });
        if (!loginResponse.error) {
          setUsername("");
          setPassword("");
          toast("Welcome to Seediy! 🌱");
          navigate("/dashboard");
        } else {
          toast("Incorrect username or password");
        }
        dispatch(set(loginResponse.data.access_token));
      } else {
        toast("Sign Up was not successful, please try again.");
      }
    } else {
      toast("Oops! Passwords do not match 🫣");
    }
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handlePasswordConfChange = (event) => {
    const value = event.target.value;
    setPasswordConf(value);
  };

  const handleZipcodeChange = (event) => {
    const value = event.target.value;
    setZipcode(value);
  };

  const handleFirstFrostChange = (event) => {
    const value = event.target.value;
    setFirstFrost(value);
  };

  const handleLastFrostChange = (event) => {
    const value = event.target.value;
    setLastFrost(value);
  };

  return (
    <div>
      <div className="flex place-content-center items-center h-[100vh] w-[100vw]">
        <LeafyBackground />
        <div className="z-40 border-2 border-dgrey m-16 flex flex-col place-content-center w-[755px] h-[500px] big-box justify-self-center">
          <p className="text-3xl m-3 w-100 text-center mb-8">
            Welcome to Seediy!
          </p>
          <div className="flex">
            <div className="flex items-end flex-col ml-8">
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
              <div className="flex place-content-center items-center">
                <p>Email: </p>
                <input
                  type="email"
                  name="email"
                  onChange={handleEmailChange}
                  value={email}
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
                  className="h-[25px] w-[25px] absolute right-[6%]"
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
            </div>
            <div className="flex items-start flex-col ml-8">
              <div className="flex place-content-center items-center">
                <p>Zipcode: </p>
                <input
                  type="text"
                  name="zipcode"
                  onChange={handleZipcodeChange}
                  value={zipcode}
                  className="m-4 box px-2"
                />
              </div>
              <div className="flex place-content-center items-center">
                <p>First Frost: </p>
                <input
                  type="date"
                  name="firstFrost"
                  onChange={handleFirstFrostChange}
                  value={firstFrost}
                  className="m-4 box px-2"
                />
              </div>
              <div className="flex place-content-center items-center">
                <p>Last Frost: </p>
                <input
                  type="date"
                  name="lastFrost"
                  onChange={handleLastFrostChange}
                  value={lastFrost}
                  className="m-4 box px-2"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="relative flex place-content-start items-center ml-4">
              <p className="pl-3">Retype your password:</p>
              <input
                type={showPass ? "text" : "password"}
                name="passwordConf"
                onChange={handlePasswordConfChange}
                value={passwordConf}
                className="m-4 box px-2"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="h-[25px] w-[25px] absolute right-[45%]"
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
          </div>
          <div className="flex flex-col place-content-center mt-8">
            <div className="flex place-content-center">
              <button
                className="button w-[10vw] text-center hover:scale-[102%]"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
            <div className="flex place-content-center mt-3">
              <p>
                Already growing here?{" "}
                <button
                  className="hover:text-dgreen"
                  onClick={() => navigate("/login")}
                >
                  Log In!
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
