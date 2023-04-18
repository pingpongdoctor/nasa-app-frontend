import "./HeaderComponent.scss";
import { useAppSelector } from "../../customHooks/customHooks";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderComponentProps {
  handleLogout: () => void;
}

const HeaderComponent = ({ handleLogout }: HeaderComponentProps) => {
  //GET CURRENT PATH
  const currentPath = useLocation().pathname;
  //GET THE LOGIN STATE
  const isLogin = useAppSelector((state) => state.login.value);
  //FUNCTION TO NAVIGATE TO THE LOGIN PAGE
  const navigate = useNavigate();
  const handleNavigateLoginPage = function () {
    navigate("/login");
  };
  const handleNavigateSignupPage = function () {
    navigate("/signup");
  };

  if (currentPath !== "/login" && currentPath !== "/signup") {
    return (
      <div>
        {!isLogin && <button onClick={handleNavigateLoginPage}>Login</button>}
        {isLogin && <button onClick={handleLogout}>Logout</button>}
        {!isLogin && <button onClick={handleNavigateSignupPage}>Signup</button>}
      </div>
    );
  } else {
    return <></>;
  }
};

export default HeaderComponent;
