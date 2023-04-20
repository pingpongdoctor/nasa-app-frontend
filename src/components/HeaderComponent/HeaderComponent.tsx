import "./HeaderComponent.scss";
import { useAppSelector } from "../../customHooks/customHooks";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface HeaderComponentProps {
  handleLogout: () => void;
}

const HeaderComponent = ({ handleLogout }: HeaderComponentProps) => {
  //GET CURRENT PATH
  const currentPath = useLocation().pathname;
  //GET THE LOGIN STATE
  const isLogin = useAppSelector((state) => state.login.value);
  //GET USERPROFILE STATE
  const userProfile = useAppSelector((state) => state.user.value);
  //FUNCTION TO NAVIGATE TO THE LOGIN PAGE
  const navigate = useNavigate();
  const handleNavigateLoginPage = function () {
    navigate("/login");
  };
  const handleNavigateSignupPage = function () {
    navigate("/signup");
  };
  //FUNCTION TO LOGOUT
  const handleLogoutFunction = function (): void {
    handleLogout();
    navigate("/login");
  };

  //GET THE AUTHENTICATING STATE
  const isAuthenticate = useAppSelector((state) => state.authenticating.value);

  if (currentPath !== "/login" && currentPath !== "/signup") {
    return (
      <div className="header-component">
        {isAuthenticate === false && (
          <div className="header-component__container">
            {userProfile && userProfile.username && (
              <p className="header-component__username">
                {userProfile.username}
              </p>
            )}
            {!isLogin && (
              <ButtonComponent
                buttonContent="Login"
                buttonOnClickFunction={handleNavigateLoginPage}
                buttonClassName="button-component button-component--header"
              />
            )}
            {!isLogin && (
              <ButtonComponent
                buttonContent="Signup"
                buttonOnClickFunction={handleNavigateSignupPage}
                buttonClassName="button-component button-component--header"
              />
            )}
            {isLogin && (
              <ButtonComponent
                buttonContent="Logout"
                buttonOnClickFunction={handleLogoutFunction}
                buttonClassName="button-component button-component--header"
              />
            )}
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default HeaderComponent;
