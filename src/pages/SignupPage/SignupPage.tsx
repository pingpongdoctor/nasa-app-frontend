import "./SignupPage.scss";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div>
      <form>
        <p>Signup New Account</p>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </form>
      <Link to={"/"}>HomePage</Link>
      <Link to={"/login"}>LoginPage</Link>
    </div>
  );
};

export default SignupPage;
