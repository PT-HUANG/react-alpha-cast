import { createContext, useContext, useState, useRef } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [EmbedController, setEmbedController] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState({
    id: "default",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [episodePlayedSeconds, setEpisodePlayedSeconds] = useState(0);
  const timerRef = useRef(null);

  const handlePlayPause = async (episode) => {
    // Case 1 還沒開始播放或是換曲目
    if (currentEpisode.id === "default" && !isPlaying) {
      setCurrentEpisode(episode);
      await EmbedController.loadUri(episode.uri);
      await EmbedController.play();

      // Case 2 暫停正在放的曲目
    } else if (currentEpisode.id === episode.id && isPlaying) {
      await EmbedController.pause();
      setIsPlaying(false);
      pauseTimer();

      // Case 3 恢復正在放的曲目
    } else if (currentEpisode.id === episode.id && !isPlaying) {
      await EmbedController.resume();
      setIsPlaying(true);
      startTimer();

      // Casw 4 更換曲目
    } else if (currentEpisode.id !== episode.id) {
      setCurrentEpisode(episode);
      await EmbedController.loadUri(episode.uri);
      await EmbedController.play();
      resetTimer();
    }
  };

  const handleRestart = async (episode) => {
    await EmbedController.loadUri(episode.uri);
    await EmbedController.play();
    setIsPlaying(true);
  };

  const startTimer = () => {
    if (timerRef.current) return; // 避免重複啟動
    timerRef.current = setInterval(() => {
      setEpisodePlayedSeconds((prev) => prev + 1000);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetTimer = () => {
    pauseTimer();
    setEpisodePlayedSeconds(0);
  };

  return (
    <PlayerContext.Provider
      value={{
        EmbedController,
        setEmbedController,
        currentEpisode,
        handlePlayPause,
        isPlaying,
        setIsPlaying,
        handleRestart,
        episodePlayedSeconds,
        startTimer,
        pauseTimer,
        resetTimer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
