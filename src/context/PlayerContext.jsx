import { createContext, useContext, useState, useRef } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [EmbedController, setEmbedController] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState({
    id: "default",
    isPlaying: false,
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [episodePlayedSeconds, setEpisodePlayedSeconds] = useState(0);
  const intervalRef = useRef(null);

  async function handleRestart(episode) {
    StopTimer();
    await EmbedController.play();
    setCurrentEpisode({ ...episode, isPlaying: true });
    StartTimer();
  }

  async function handlePlayPause(episode) {
    if (isDisabled) return;
    setIsDisabled(true);
    if (currentEpisode.id !== episode.id) {
      await EmbedController.loadUri(`spotify:episode:${episode.id}`);
      await EmbedController.play();
      setCurrentEpisode({ ...episode, isPlaying: true });
      StartTimer();
    } else {
      await EmbedController.togglePlay();
      setCurrentEpisode({
        ...currentEpisode,
        isPlaying: !currentEpisode.isPlaying,
      });
      if (currentEpisode.isPlaying) {
        StopTimer();
      } else {
        ResumeTimer();
      }
    }
    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  }

  function StartTimer() {
    clearInterval(intervalRef.current);
    setEpisodePlayedSeconds(0);
    intervalRef.current = setInterval(() => {
      setEpisodePlayedSeconds((prevTimer) => prevTimer + 1000);
    }, 1000);
  }

  function StopTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function ResumeTimer() {
    intervalRef.current = setInterval(() => {
      setEpisodePlayedSeconds((prevTimer) => prevTimer + 1000);
    }, 1000);
  }

  return (
    <PlayerContext.Provider
      value={{
        EmbedController,
        setEmbedController,
        handleRestart,
        handlePlayPause,
        currentEpisode,
        episodePlayedSeconds,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
