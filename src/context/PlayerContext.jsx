import { createContext, useContext, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [EmbedController, setEmbedController] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState({
    id: "initail",
    isPlaying: false,
  });

  function handlePlayPause(episode) {
    if (currentEpisode.id !== episode.id) {
      setCurrentEpisode({ ...episode, isPlaying: true });
      EmbedController.loadUri(`spotify:episode:${episode.id}`);
      EmbedController.togglePlay();
    } else {
      setCurrentEpisode({
        ...currentEpisode,
        isPlaying: !currentEpisode.isPlaying,
      });
      EmbedController.togglePlay();
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        EmbedController,
        setEmbedController,
        handlePlayPause,
        currentEpisode,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
