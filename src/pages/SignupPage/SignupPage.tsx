import "./SignupPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../customHooks/customHooks";
import { useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const url = import.meta.env.VITE_APP_API_URL;

const SignupPage = () => {
  //GET LOGIN STATE
  const isLogin = useAppSelector((state) => state.login.value);
  //STATES FOR USERNAME AND PASSWORD
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //STATE FOR THE INPUT ERROR
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  //FUNCTIONS TO VALIDATE USERNAME AND PASSWORD
  const isUsernameValid = function (): boolean {
    if (username) {
      return true;
    } else {
      return false;
    }
  };
  const isPasswordValid = function (): boolean {
    if (password) {
      return true;
    }
    return false;
  };
  //FUNCTION TO UPDATE THE USERNAME AND PASSWORD
  const handleUpdateUsername = function (e: ChangeEvent<HTMLInputElement>) {
    setUsernameError("");
    setUsername(e.target.value);
  };

  const handleUpdatePassword = function (e: ChangeEvent<HTMLInputElement>) {
    setPasswordError("");
    setPassword(e.target.value);
  };
  //FUNCTION TO SIGN UP
  const navigate = useNavigate();
  const handleSignup = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isUsernameValid() && isPasswordValid()) {
      const objectData = { username, password };
      setUsernameError("");
      setPasswordError("");

      axios
        .post(`${url}/signup`, objectData)
        .then((res) => {
          alert("New account is created. Let's log in!");
          setTimeout(() => {
            navigate("/login");
          }, 700);
        })
        .catch((e) => alert(e.response.data));
    } else {
      alert("Please provide both username and password");
      setUsernameError("input-component--error");
      setPasswordError("input-component--error");
    }
  };

  //USEEFFECT TO NAVIGATE BACK TO HOMEPAGE WHEN USER IS ALREADY AUTHENTICATED
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  //USEEFFECT TO HANDLE LOADING COMPONENT STATE
  const [loadingDisplayNone, setLoadingDisplayNone] = useState<string>("");
  useEffect(() => {
    setTimeout(() => {
      setLoadingDisplayNone("loading-component--display-none");
    }, 700);
  });

  return (
    <div className="signup-component">
      <LoadingComponent loadingComponentDisappear={loadingDisplayNone} />
      <h1>Sign up New Account</h1>
      <form className="signup-component__form" onSubmit={handleSignup}>
        <div className="signup-component__wrapper">
          <label className="signup-component__label" htmlFor="username">
            Username
          </label>
          <InputComponent
            InputPlaceHolder="Your Username"
            InputType="text"
            InputId="username"
            InputOnChangeFunction={handleUpdateUsername}
            InputClassName={`input-component ${usernameError}`}
          />
        </div>

        <div className="signup-component__wrapper">
          <label className="signup-component__label" htmlFor="password">
            Password
          </label>
          <InputComponent
            InputPlaceHolder="Your Password"
            InputType="text"
            InputId="password"
            InputOnChangeFunction={handleUpdatePassword}
            InputClassName={`input-component ${passwordError}`}
          />
        </div>
        <ButtonComponent
          buttonContent="Sign up"
          buttonClassName="button-component"
        />
        <div className=" signup-component__links">
          <Link className="signup-component__link" to={"/"}>
            Home
          </Link>
          <Link className="signup-component__link" to={"/login"}>
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
