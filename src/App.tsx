import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { useAppDispatch, useAppSelector } from "./customHooks/customHooks";
import LoginPage from "./pages/LoginPage/LoginPage";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import SignupPage from "./pages/SignupPage/SignupPage";
import axios from "axios";
import { useEffect } from "react";
import userProfileSlice, {
  updateUserProfile,
} from "./features/userProfileSlice";
import { updateAccessToken } from "./features/accessTokenSlice";
import { updateLoginState } from "./features/loginSlice";
const url = import.meta.env.VITE_APP_API_URL;

function App() {
  //DEFINE DISPATCH FUNCTION TO UPDATE STATES
  const dispatch = useAppDispatch();

  //GET THE ACCESS TOKEN STATE
  const accessTokenState = useAppSelector((state) => state.accessToken.value);
  const loginState = useAppSelector((state) => state.login.value);
  const userProfile = useAppSelector((state) => state.user.value);
  useEffect(() => {
    console.log(accessTokenState);
    console.log(loginState);
    console.log(userProfile);
  }, [accessTokenState, loginState, userProfile]);

  //FUNCTION TO GET USER PROFILE WITH ACCESSTOKEN
  const getUserProfile = function (accessToken: string): void {
    //IF ACCESS TOKEN EXIST
    if (accessToken) {
      axios
        .get(`${url}/user-profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          //NEW USER PROFILE RETURNED
          if (res.data && res.data._id) {
            dispatch(updateUserProfile(res.data));
            dispatch(updateLoginState(true));
          }
          //NEW ACCESS TOKEN RETURNED
          if (res.data && res.data._id === undefined) {
            dispatch(updateAccessToken(res.data));
            dispatch(updateLoginState(false));
          }
        })
        .catch((e) => console.log(e));
    }
  };

  //FUNCTION TO GET NEW ACCESS TOKEN
  const getNewAccessToken = function () {
    axios
      .get(`${url}/get-access-token`, { withCredentials: true })
      .then((res) => {
        dispatch(updateAccessToken(res.data));
      })
      .catch((e) => console.log(e));
  };

  //USEEFFECT TO GET NEW ACCESS TOKEN WHEN PAGE IS LOADED
  useEffect(() => {
    getNewAccessToken();
  }, []);

  //USEEFFECT TO GET USER PROFILE WHEN ACCESS TOKEN IS UPDATED
  useEffect(() => {
    if (accessTokenState) {
      getUserProfile(accessTokenState);
    }
  }, [accessTokenState]);

  return (
    <BrowserRouter>
      <div className="App">
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage getUserProfile={getUserProfile} />}
          />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
