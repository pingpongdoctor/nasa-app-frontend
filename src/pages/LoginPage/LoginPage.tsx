import "./LoginPage.scss";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../../customHooks/customHooks";
import { updateAccessToken } from "../../features/accessTokenSlice";
const url = import.meta.env.VITE_APP_API_URL;

//DATA TYPE ANNOTATION FOR LOGIN PAGE PROPS
interface LoginPageProps {
  getUserProfile: Function;
}

const LoginPage = ({ getUserProfile }: LoginPageProps) => {
  //DEFINE DISPATCH FUNCTION
  const dispatch = useAppDispatch();
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
        .post(`${url}/login`, objectData)
        .then((res) => {
          //UPDATE ACCESS TOKEN TO THE ACCESS TOKEN STATE
          dispatch(updateAccessToken(res.data));
          //INVOKE THE FUNCTION TO GET USER PROFILE
          getUserProfile(res.data);
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <p>Login To See The NASA Picture</p>
        <label htmlFor="username">Username</label>
        <input onChange={handleUpdateUsername} type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input onChange={handleUpdatePassword} type="password" id="password" />
        <button>Login</button>
      </form>
      <Link to={"/"}>HomePage</Link>
      <Link to={"/signup"}>SignupPage</Link>
    </div>
  );
};

export default LoginPage;
