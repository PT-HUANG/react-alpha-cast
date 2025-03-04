import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isTokenValid } from "../api/spotify";
import { useAuth } from "../context/AuthContext";

const WelcomeContainer = styled.div`
  margin: 0 auto;
  background-size: cover;
  background-position: center center;
  min-height: 100vh;
  padding-top: 3rem;
`;

const WelcomeWrapper = styled.div`
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 5px;
  width: 80%;
  max-width: 800px;
  min-height: 500px;
  padding: 3rem;
  @media screen and (min-width: 768px) {
    padding: 4rem;
  }
`;

const Title = styled.h2`
  line-height: 2.5rem;
  font-weight: 700;
`;

const Introduction = styled.p`
  margin: 2rem 0;
  font-size: 1.25rem;
  line-height: 2rem;
`;

function Welcome() {
  const navigate = useNavigate();

  window.onload = function () {
    const introduction = document.querySelector(".introduction");
    const content = `ALPHA Cast 是一款讓播客體驗更簡單直觀的應用程式，支援Spotify登入，快速連結你的音樂與播客世界。在主要頁面，使用者可看到自己的名字、編輯個人資訊，並透過分類如「上班途中」「學習」快速找到合適內容，輕鬆收藏並控制播放。`;
    let index = 0;
    function typewriter() {
      if (index < content.length) {
        introduction.innerHTML += content[index];
        index++;
      } else clearInterval;
    }
    setInterval(typewriter, 75);
  };

  useEffect(() => {
    async function handleLogin() {
      const validity = await isTokenValid();
      if (!validity) {
        return;
      }
      navigate("/login");
    }
    handleLogin();
  }, [navigate]);

  return (
    <WelcomeContainer className="welcomeContainer">
      <WelcomeWrapper>
        <Title>ALPHA Cast：你的個性化播客夥伴</Title>
        <Introduction className="introduction"></Introduction>
        <div className="link_container">
          <Link className="login_link" to="/login">
            <i className="fa-solid fa-right-to-bracket"></i>
            <span>開始體驗</span>
          </Link>
        </div>
      </WelcomeWrapper>
    </WelcomeContainer>
  );
}

export default Welcome;
