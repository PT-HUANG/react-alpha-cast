import { FeatureSlide } from "../components";
import { loginWithSpotifyClick } from "../api/spotify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isTokenValid } from "../api/spotify";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ac_logo from "../assets/images/login_logo.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login, getProfile } = useAuth();

  useEffect(() => {
    async function handleLogin() {
      const validity = await isTokenValid();
      if (!validity) {
        return;
      }
      await login();
      await getProfile();
      navigate("/home");
    }
    handleLogin();
    return () => {
      handleLogin;
    };
  }, [navigate]);

  return (
    <div
      className={
        isAuthenticated ? "loginPage_container disabled" : "loginPage_container"
      }
    >
      {isAuthenticated ? (
        <div className="loader_container">
          <div className="login_loader"></div>
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
            <div>
              <span>沒有帳號嗎? </span>
              <strong>
                <Link to="https://www.spotify.com/tw/signup" target="_blank">
                  註冊帳號
                </Link>
              </strong>
            </div>
            <br />
            <div>
              <strong>測試帳號: tenfrontdev+spotifytest@gmail.com</strong>
            </div>
            <div>
              <strong>測試密碼: Spotify_test123</strong>
            </div>
          </div>
        </div>
        <div className="login_footer">Copyright 2025</div>
      </div>
      <FeatureSlide />
    </div>
  );
}
