import {
  DefaultStatus,
  EpisodeCard,
  PodcastCard,
  UserInfo,
  Player,
} from "../components";
import { useEffect, useState } from "react";
import { getEpisodes } from "../api/Spotify";
import { usePlayer } from "../Context/PlayerContext";

function Main({ userInfo }) {
  const categoryId = localStorage.getItem("selectedCategoryId");
  const { savedShows } = userInfo;
  const [currentShows, setCurrentShows] = useState([]);
  const [greetings, setGreetings] = useState("");
  const { currentEpisode } = usePlayer();

  useEffect(() => {
    function getGreetings() {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 5 && hours < 12) {
        setGreetings("早安"); // 5:00 AM - 11:59 AM
      } else if (hours >= 12 && hours < 18) {
        setGreetings("午安"); // 12:00 PM - 5:59 PM
      } else {
        setGreetings("晚安"); // 6:00 PM - 4:59 AM
      }
    }

    async function handleFetchShows() {
      if (categoryId === "favorites") {
        const fetchData = await getEpisodes(savedShows);
        const formattedData = fetchData.map((data) => {
          return { ...data, isSelected: false };
        });
        setCurrentShows(formattedData);
      } else {
        setCurrentShows(savedShows);
      }
    }
    getGreetings();
    handleFetchShows();
  }, [categoryId, savedShows.length]);

  function handleSelectEpisode(episodeId) {
    const nextFavoriteEpisodes = currentShows.map((show) => {
      if (show.id === episodeId) {
        return { ...show, isSelected: true };
      } else {
        return { ...show, isSelected: false };
      }
    });
    setCurrentShows(nextFavoriteEpisodes);
  }

  return (
    <div className="main_container">
      <h2 className="greetings">{greetings}</h2>
      {currentShows?.length ? (
        <div className="main_container">
          {categoryId === "favorites" ? (
            <FavoriteList shows={currentShows} onSelect={handleSelectEpisode} />
          ) : (
            <PodcastList shows={currentShows} />
          )}
        </div>
      ) : (
        <DefaultStatus />
      )}
      <button
        className="console_button"
        onClick={() => {
          console.log(userInfo);
          console.log(currentEpisode);
        }}
      >
        Console
      </button>
      <UserInfo />
      {currentEpisode && <Player />}
    </div>
  );
}

function FavoriteList({ shows, onSelect }) {
  return (
    <div className="favorite_container">
      {shows.map((show) => (
        <EpisodeCard key={show.id} episode={show} onSelect={onSelect} />
      ))}
    </div>
  );
}

function PodcastList({ shows }) {
  return (
    <div className="podcast_container">
      {shows.map((show) => (
        <PodcastCard key={show.id} info={show} />
      ))}
    </div>
  );
}

export default Main;
