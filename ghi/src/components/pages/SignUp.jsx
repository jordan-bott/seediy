import { useDispatch } from "react-redux";
import { useLoginMutation, useSignupMutation } from "../../store/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { set } from "../../store/tokenSlice";
import LeafyBackground from "../LeafyBackground";

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
      <div className="flex h-[100vh] w-[100vw] place-content-center items-center">
        <LeafyBackground />
        <div className="big-box z-40 m-16 flex h-[500px] w-[755px] flex-col place-content-center justify-self-center border-2 border-dgrey">
          <p className="w-100 m-3 mb-8 text-center text-3xl">
            Welcome to Seediy!
          </p>
          <div className="flex">
            <div className="ml-8 flex flex-col items-end">
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
              <div className="flex place-content-center items-center">
                <p>Email: </p>
                <input
                  type="email"
                  name="email"
                  onChange={handleEmailChange}
                  value={email}
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
                  className="absolute right-[6%] h-[25px] w-[25px]"
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
            <div className="ml-8 flex flex-col items-start">
              <div className="flex place-content-center items-center">
                <p>Zipcode: </p>
                <input
                  type="text"
                  name="zipcode"
                  onChange={handleZipcodeChange}
                  value={zipcode}
                  className="box m-4 px-2"
                />
              </div>
              <div className="flex place-content-center items-center">
                <p>First Frost: </p>
                <input
                  type="date"
                  name="firstFrost"
                  onChange={handleFirstFrostChange}
                  value={firstFrost}
                  className="box m-4 px-2"
                />
              </div>
              <div className="flex place-content-center items-center">
                <p>Last Frost: </p>
                <input
                  type="date"
                  name="lastFrost"
                  onChange={handleLastFrostChange}
                  value={lastFrost}
                  className="box m-4 px-2"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="relative ml-4 flex place-content-start items-center">
              <p className="pl-3">Retype your password:</p>
              <input
                type={showPass ? "text" : "password"}
                name="passwordConf"
                onChange={handlePasswordConfChange}
                value={passwordConf}
                className="box m-4 px-2"
              />
              <button
                onClick={() => setShowPass(!showPass)}
                className="absolute right-[45%] h-[25px] w-[25px]"
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
          <div className="mt-8 flex flex-col place-content-center">
            <div className="flex place-content-center">
              <button
                className="button w-[10vw] text-center hover:scale-[102%]"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
            <div className="mt-3 flex place-content-center">
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
