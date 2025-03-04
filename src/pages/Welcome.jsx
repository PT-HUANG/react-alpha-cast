import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isTokenValid } from "../api/spotify";

const WelcomeContainer = styled.div`
  margin: 0 auto;
  background-size: cover;
  background-position: center center;
  min-height: 100vh;
  padding-top: 2.5rem;
`;

const WelcomeWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 5px;
  width: 80%;
  max-width: 800px;
  min-height: 500px;
  padding: 2.5rem;
  @media screen and (min-width: 768px) {
    padding: 4rem;
  }
`;

const Title = styled.h2`
  line-height: 2.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  @media screen and (min-width: 768px) {
    font-size: calc(1.325rem + 0.9vw);
  }
`;

const Introduction = styled.p`
  margin: 1rem 0;
  font-size: 1rem;
  line-height: 1.75rem;
  @media screen and (min-width: 768px) {
    font-size: 1.25rem;
    line-height: 2rem;
    margin: 2rem 0;
  }
`;

const LinkContainer = styled.div`
  margin: 1.5rem auto;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  & div {
    margin: 1rem auto;
  }
  & .fa-solid {
    margin-right: 0.5rem;
  }
  @media screen and (min-width: 768px) {
    margin: 3rem auto;
  }
`;

function Welcome() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const content = `ALLPHA Cast 是一款讓播客體驗更簡單直觀的應用程式，支援Spotify登入，快速連結你的音樂與播客世界。在主要頁面，使用者可看到自己的名字、編輯個人資訊，並透過分類如「上班途中」「學習」快速找到合適內容，輕鬆收藏並控制播放。`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prevText) => prevText + content[index]);
      index++;
      if (index === content.length - 1) {
        clearInterval(interval);
      }
    }, 75);

    return () => clearInterval(interval);
  }, []);

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
        <Introduction className="introduction">{text}</Introduction>
        <LinkContainer>
          <Link className="login_link" to="/login">
            <i className="fa-solid fa-right-to-bracket"></i>
            <span>開始體驗</span>
          </Link>
        </LinkContainer>
      </WelcomeWrapper>
    </WelcomeContainer>
  );
}

export default Welcome;
