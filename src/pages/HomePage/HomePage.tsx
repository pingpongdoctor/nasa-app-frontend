import "./HomePage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../customHooks/customHooks";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const NASA_API_URL = import.meta.env.VITE_APP_NASA_URL;
const NASA_API_KEY = import.meta.env.VITE_APP_NASA_API_KEY;

const HomePage = () => {
  //GET AUTHENTICATING STATE
  const isAuthenticating = useAppSelector(
    (state) => state.authenticating.value
  );

  //GET THE LOGIN STATE AND USER PROFILE
  const isLogin = useAppSelector((state) => state.login.value);
  const userProfile = useAppSelector((state) => state.user.value);

  //DATA TYPE FOR THE IMAGE DATA
  interface ImgData {
    [index: string]: string;
    title: string;
    explanation: string;
    date: string;
    url: string;
  }

  //STATE FOR THE IMAGE DATA
  const [imgData, setImgData] = useState<ImgData | null>(null);

  //STATE FOR MAKING LOADING COMPONENT DISAPPEAR
  const [loadingDisappear, setLoadingDisappear] = useState<string>("");

  //FUNCTION TO FETCH IMAGE FROM NASA API EVERY 24H
  const handleFetchData = function () {
    axios
      .get(`${NASA_API_URL}?api_key=${NASA_API_KEY}`)
      .then((response) => {
        setImgData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //USE EFFECT TO GET THE IMAGE DATA FROM NASA API
  useEffect(() => {
    handleFetchData();
  }, []);

  //USEEFFECT TO HANDLE LOADING DISAPPEAR STATE
  useEffect(() => {
    if (isAuthenticating === false && isLogin && userProfile && imgData) {
      setTimeout(() => {
        setLoadingDisappear("loading-component--display-none");
      }, 700);
    }
  }, [isAuthenticating, isLogin, userProfile, imgData]);

  if (isAuthenticating === true) {
    return <LoadingComponent loadingContent="Authenticating" />;
  }

  if (isLogin && userProfile) {
    return (
      <div className="home-page">
        <div className="home-page__container">
          <LoadingComponent
            loadingContent="Loading"
            loadingComponentDisappear={loadingDisappear}
          />
          {imgData && (
            <div>
              {/* SHOW NASA DAILY IMAGE AND ITS EXPLANATION */}
              <div>
                <h1>{imgData.title} </h1>
                <p>Date: {new Date(imgData.date).toDateString()}</p>
                <img
                  className="home-page__img"
                  src={imgData.url}
                  alt="nasa-picture"
                />
                <p>{imgData.explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h1>Please log in to see NASA picture</h1>
      </>
    );
  }
};

export default HomePage;
