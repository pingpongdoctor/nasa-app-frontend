import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../customHooks/customHooks";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
const url = import.meta.env.VITE_APP_API_URL;

//DATA TYPE ANNOTATION FOR LOGIN PAGE PROPS
interface LoginPageProps {
  getUserProfile: () => void;
}

const LoginPage = ({ getUserProfile }: LoginPageProps) => {
  //GET LOGIN STATE
  const isLogin = useAppSelector((state) => state.login.value);
  //STATES FOR USERNAME AND PASSWORD
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
    setUsername(e.target.value);
  };

  const handleUpdatePassword = function (e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  };

  //FUNCTION TO LOGIN
  const handleLogin = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isUsernameValid() && isPasswordValid()) {
      const objectData = { username, password };
      axios
        .post(`${url}/login`, objectData, { withCredentials: true })
        .then((res) => {
          //GET NEW TOKENS AND THEN GET USER PROFILE
          getUserProfile();
        })
        .catch((e) => console.log(e));
    }
  };

  //USEEFFECT TO NAVIGATE BACK TO HOMEPAGE WHEN USER IS ALREADY AUTHENTICATED
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <div className="login-component">
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
            InputClassName="input-component"
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
            InputType="text"
            InputClassName="input-component"
          />
        </div>

        <ButtonComponent
          buttonClassName="button-component"
          buttonContent="Login"
        />
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
