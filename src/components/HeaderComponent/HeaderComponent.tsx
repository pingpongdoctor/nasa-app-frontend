import "./HeaderComponent.scss";
import { useAppSelector } from "../../customHooks/customHooks";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderComponent = () => {
  //GET CURRENT PATH
  const currentPath = useLocation().pathname;
  //GET THE LOGIN STATE
  const isLogin = useAppSelector((state) => state.login.value);
  //FUNCTION TO NAVIGATE TO THE LOGIN PAGE
  const navigate = useNavigate();
  const handleNavigateLoginPage = function () {
    navigate("/login");
  };

  if (currentPath !== "/login" && currentPath !== "/signup") {
    return (
      <div>
        {!isLogin && <button onClick={handleNavigateLoginPage}>Login</button>}
        {isLogin && <button>Logout</button>}
      </div>
    );
  } else {
    return <></>;
  }
};

export default HeaderComponent;
