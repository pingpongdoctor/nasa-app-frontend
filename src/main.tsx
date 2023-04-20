import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/loginSlice";
import userReducer from "./features/userProfileSlice";
import authenticatingReducer from "./features/authenticatingSlice";

//DEFINE THE STORE
const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    authenticating: authenticatingReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //USE PROVIDER TO PASS THE STORE DOWN TO APP.TSX
  <Provider store={store}>
    <App />
  </Provider>
);

//GET THE TYPE OF STATE WHICH IS RETURNED FROM USESELECTOR
export type RootState = ReturnType<typeof store.getState>;
//GET THE TYPE OF THE DISPATCH FUNCTION WHICH IS RETURNED FROM THE USEDISPATCH
export type AppDispatch = typeof store.dispatch;
