import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { useAppSelector, useAppDispatch } from "./customHooks/customHooks";
import { updateLoginState } from "./features/loginSlice";
import { updateUserProfile } from "./features/userProfileSlice";
import LoginPage from "./pages/LoginPage/LoginPage";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
  //GET THE LOGIN STATE AND THE USER PROFILE STATE
  const isLogin = useAppSelector((state) => state.login.value);
  const userProfile = useAppSelector((state) => state.user.value);
  console.log(isLogin, userProfile);
  //DEFINE DISPATCH FUNCTION TO UPDATE STATES
  const dispatch = useAppDispatch();
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
