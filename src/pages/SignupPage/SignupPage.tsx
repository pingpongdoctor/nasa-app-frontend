import "./SignupPage.scss";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { setUseProxies } from "immer";
import axios from "axios";
const url = import.meta.env.VITE_APP_API_URL;

const SignupPage = () => {
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
  //FUNCTION TO SIGNUP
  const handleSignup = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isUsernameValid() && isPasswordValid()) {
      const updatedObj = { username, password };
      axios
        .post(`${url}/signup`, updatedObj)
        .then((res) => alert(res.data))
        .catch((e) => alert(e.response.data));
    } else {
      alert("Please provide valid username and password");
    }
  };
  console.log(username, password);
  return (
    <div>
      <form onSubmit={handleSignup}>
        <p>Signup New Account</p>
        <label htmlFor="username">Username</label>
        <input onChange={handleUpdateUsername} type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input onChange={handleUpdatePassword} type="password" id="password" />
        <button>Signup</button>
      </form>
      <Link to={"/"}>HomePage</Link>
      <Link to={"/login"}>LoginPage</Link>
    </div>
  );
};

export default SignupPage;
