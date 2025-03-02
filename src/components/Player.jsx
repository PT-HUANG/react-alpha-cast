import { useEffect } from "react";
import { usePlayer } from "../Context/PlayerContext";
import { PlayerCard } from "../components";

function Player() {
  const { setEmbedController, currentEpisode } = usePlayer();
  useEffect(() => {
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      let element = document.getElementById("embed-iframe");
      let options = {
        uri: "spotify:episode:7makk4oTQel546B0PZlDM5",
      };
      let callback = (EmbedController) => {
        console.log("加載完成");
        console.log(EmbedController);
        setEmbedController(EmbedController);
      };
      IFrameAPI.createController(element, options, callback);
    };
  }, []);

  return (
    <div className="player_container">
      <div className="player_title">正在播放</div>
      <hr className="player_hr" />
      <div id="embed-iframe"></div>
      {currentEpisode.id !== "default" ? <PlayerCard /> : ""}
    </div>
  );
}

export default Player;
