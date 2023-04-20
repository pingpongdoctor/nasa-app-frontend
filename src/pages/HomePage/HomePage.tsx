import "./HomePage.scss";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../customHooks/customHooks";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
const NASA_API_URL = import.meta.env.VITE_APP_NASA_URL;
const NASA_API_KEY = import.meta.env.VITE_APP_NASA_API_KEY;

const HomePage = () => {
  const navigate = useNavigate();
  //GET AUTHENTICATING STATE
  const isAuthenticating = useAppSelector(
    (state) => state.authenticating.value
  );

  //GET THE LOGIN STATE AND USER PROFILE
  const isLogin = useAppSelector((state) => state.login.value);
  const userProfile = useAppSelector((state) => state.user.value);

  //DATA TYPE FOR THE IMAGE DATA
  interface ImgData {
    title: string;
    hdurl: string;
    explanation: string;
    date: string;
  }

  //STATE FOR THE IMAGE DATA
  const [imgData, setImgData] = useState<ImgData | null>(null);

  //STATE FOR MAKING LOADING COMPONENT DISAPPEAR
  const [loadingDisappear, setLoadingDisappear] = useState<string>("");

  //STATE FOR CHECKING IF IMAGE IS FULLY LOADED IN THE IMAGE TAG
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

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

  //USEEFFECT TO HANDLE THE ISIMAGELOADED STATE
  const nasaImage = useRef(null);
  useEffect(() => {
    if (
      isAuthenticating === false &&
      isLogin &&
      userProfile &&
      imgData &&
      nasaImage
    ) {
      const currentImage = nasaImage.current as unknown as HTMLImageElement;
      currentImage.addEventListener("load", () => {
        setIsImageLoaded(true);
      });
    }
  }, [isLogin, userProfile, imgData, nasaImage]);

  //USEEFFECT TO HANDLE LOADING DISAPPEAR STATE
  useEffect(() => {
    if (
      isAuthenticating === false &&
      isLogin &&
      userProfile &&
      imgData &&
      isImageLoaded
    ) {
      setTimeout(() => {
        setLoadingDisappear("loading-component--display-none");
      }, 700);
    }
  });

  if (isAuthenticating === true) {
    return <LoadingComponent loadingContent="Authenticating" />;
  }

  if (isLogin && userProfile) {
    return (
      <>
        <LoadingComponent
          loadingContent="Loading"
          loadingComponentDisappear={loadingDisappear}
        />
        {imgData && (
          <div>
            {/* SHOW USER PROFILE */}
            <div>
              <p>{userProfile._id}</p>
              <p>{userProfile.username}</p>
            </div>
            {/* SHOW NASA DAILY IMAGE AND ITS EXPLANATION */}
            <div>
              <h1>Title:{imgData.title} </h1>
              <p>Date: {new Date(imgData.date).toDateString()}</p>
              <img
                ref={nasaImage}
                className="nasa-data__img"
                src={imgData.hdurl}
                alt="nasa-picture"
              />
              <p>{imgData.explanation}</p>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <h1>Please login to see the NASA picture</h1>
      </>
    );
  }
};

export default HomePage;
