import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { useAppDispatch, useAppSelector } from "./customHooks/customHooks";
import LoginPage from "./pages/LoginPage/LoginPage";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import SignupPage from "./pages/SignupPage/SignupPage";
import axios from "axios";
import { useEffect } from "react";
import { updateUserProfile } from "./features/userProfileSlice";
import { updateLoginState } from "./features/loginSlice";
import { updateAuthenticatingState } from "./features/authenticatingSlice";
const url = import.meta.env.VITE_APP_API_URL;

function App() {
  //DEFINE DISPATCH FUNCTION TO UPDATE STATES
  const dispatch = useAppDispatch();

  //GET THE ACCESS TOKEN STATE
  const isLogin = useAppSelector((state) => state.login.value);
  const userProfile = useAppSelector((state) => state.user.value);
  //FUNCTION TO GET USER PROFILE WITH ACCESSTOKEN
  const getUserProfile = function (): void {
    axios
      .get(`${url}/user-profile`, {
        withCredentials: true,
      })
      .then((res) => {
        //NEW USER PROFILE RETURNED
        dispatch(updateUserProfile(res.data));
        dispatch(updateLoginState(true));
        setTimeout(() => {
          dispatch(updateAuthenticatingState(false));
        }, 700);
      })
      .catch((e) => {
        console.log(e);
        dispatch(updateUserProfile(null));
        dispatch(updateLoginState(false));
        setTimeout(() => {
          dispatch(updateAuthenticatingState(false));
        }, 700);
      });
  };

  //FUNCTION TO LOGOUT
  const handleLogout = function (): void {
    if (isLogin) {
      axios
        .delete(`${url}/logout`, { withCredentials: true })
        .then((res) => {
          dispatch(updateLoginState(false));
          dispatch(updateUserProfile(null));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  //USEEFFECT TO GET USER PROFILE WHEN PAGE IS LOADED
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <HeaderComponent handleLogout={handleLogout} />
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
