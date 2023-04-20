import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const url = import.meta.env.VITE_APP_API_URL;

//DATA TYPE ANNOTATION FOR LOGIN PAGE PROPS
interface LoginPageProps {
  getUserProfile: () => void;
}

const LoginPage = ({ getUserProfile }: LoginPageProps) => {
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

  //FUNCTION TO LOGIN
  const navigate = useNavigate();
  const handleLogin = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isUsernameValid() && isPasswordValid()) {
      const objectData = { username, password };
      setUsernameError("");
      setPasswordError("");

      axios
        .post(`${url}/login`, objectData, { withCredentials: true })
        .then((res) => {
          //GET NEW TOKENS AND THEN GET USER PROFILE
          getUserProfile();
          navigate("/");
        })
        .catch((e) => console.log(e));
    } else {
      alert("Please provide both username and password");
      setUsernameError("input-component--error");
      setPasswordError("input-component--error");
    }
  };

  //USEEFFECT TO HANDLE LOADING COMPONENT STATE
  const [loadingDisplayNone, setLoadingDisplayNone] = useState<string>("");
  useEffect(() => {
    setTimeout(() => {
      setLoadingDisplayNone("loading-component--display-none");
    }, 700);
  });

  return (
    <div className="login-component">
      <LoadingComponent loadingComponentDisappear={loadingDisplayNone} />
      <h1>Login Now</h1>
      <form className="login-component__form" onSubmit={handleLogin}>
        <div className="login-component__wrapper">
          <label className="login-component__label" htmlFor="username">
            Username
          </label>
          <InputComponent
            InputPlaceHolder="Your Username"
            InputId="username"
            InputOnChangeFunction={handleUpdateUsername}
            InputType="text"
            InputClassName={`input-component ${usernameError}`}
          />
        </div>

        <div className="login-component__wrapper">
          <label className="login-component__label" htmlFor="password">
            Password
          </label>
          <InputComponent
            InputPlaceHolder="Your Password"
            InputId="password"
            InputOnChangeFunction={handleUpdatePassword}
            InputType="password"
            InputClassName={`input-component ${passwordError}`}
          />
        </div>

        <ButtonComponent
          buttonClassName="button-component"
          buttonContent="Login"
        />
        <Link
          className="login-component__link login-component__google-link"
          to={`${url}/auth/google`}
        >
          Login with Google Account
        </Link>
        <div className="login-component__links">
          <Link className="login-component__link" to={"/"}>
            Home
          </Link>
          <Link className="login-component__link" to={"/signup"}>
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
