import { useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import { PlayerCard } from "../components";
import styled from "styled-components";

const StylePlayerContainer = styled.div`
  display: ${(props) => props.$isHidden && "none"};
  position: fixed;
  z-index: 2;
  bottom: 0.5%;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  max-width: 450px;
  height: 10%;
  background-color: #fff;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 16px 16px 40px 0px #c7c7c73d;

  @media screen and (min-width: 768px) {
    top: 15%;
    left: 74.5%;
    transform: translateX(0%);
    width: 25%;
    max-width: 312px;
    height: 60%;
    max-height: 440px;
    background-color: #fff;
  }

  & iframe {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
`;

const StylePlayerTitle = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    color: #1a202c;
  }
`;

const StylePlayerHR = styled.hr`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    height: 2px;
    background-color: #c3c8ce;
  }
`;

function Player() {
  const { setEmbedController, currentEpisode } = usePlayer();
  useEffect(() => {
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      let element = document.getElementById("embed-iframe");
      let options = {
        uri: "spotify:episode:7makk4oTQel546B0PZlDM5",
      };
      let callback = (EmbedController) => {
        setEmbedController(EmbedController);
      };
      IFrameAPI.createController(element, options, callback);
    };
  }, []);

  return (
    <StylePlayerContainer $isHidden={currentEpisode.id === "default"}>
      <StylePlayerTitle>正在播放</StylePlayerTitle>
      <StylePlayerHR />
      <div id="embed-iframe"></div>
      {currentEpisode.id !== "default" && <PlayerCard />}
    </StylePlayerContainer>
  );
}
export default Player;
