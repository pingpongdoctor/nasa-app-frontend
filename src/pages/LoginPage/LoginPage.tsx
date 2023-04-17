import "./LoginPage.scss";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <form>
        <p>Login To See The NASA Picture</p>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </form>
      <Link to={"/"}>HomePage</Link>
      <Link to={"/signup"}>SignupPage</Link>
    </div>
  );
};

export default LoginPage;
