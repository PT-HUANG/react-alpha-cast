import { FeatureSlide } from "../components";
import { loginWithSpotifyClick } from "../api/spotify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// image
import ac_logo from "../assets/images/login_logo.png";

// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Login() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const getSpotifyToken = async () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        setIsVerified(true);
        setTimeout(() => {
          navigate("/home");
        }, 4000);
      } else setIsVerified(false);
    };

    getSpotifyToken();
  }, [navigate]);

  return (
    <div
      className={
        isVerified ? "loginPage_container disabled" : "loginPage_container"
      }
    >
      {isVerified ? (
        <div className="loading_container">
          <div className="loader"></div>
        </div>
      ) : (
        ""
      )}
      <div className="login">
        <div className="login_main">
          <img src={ac_logo} className="login_logo" alt="logo" />
          <div className="login_button" onClick={loginWithSpotifyClick}>
            使用 SPOTIFY 帳號登入
          </div>
          <div className="login_register">
            <span>沒有帳號嗎? </span>
            <strong>
              <a href="https://www.spotify.com/tw/signup" target="_blank">
                註冊帳號
              </a>
            </strong>
          </div>
        </div>
        <div className="login_footer">Copyright 2025</div>
      </div>
      <FeatureSlide />
    </div>
  );
}
