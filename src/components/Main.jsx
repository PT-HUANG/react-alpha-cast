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
import Swal from "sweetalert2";

function Main({ userInfo }) {
  const categoryId = localStorage.getItem("selectedCategoryId");
  const { savedShows, favorites, message } = userInfo;
  const { favoriteEpisodeIds } = favorites;
  const [currentShows, setCurrentShows] = useState([]);
  const [greetings, setGreetings] = useState("");
  const { currentEpisode } = usePlayer();

  useEffect(() => {
    if (message === "default") {
      return;
    }
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      iconColor: "#4CAF50",
      title: `${message}`,
      showConfirmButton: false,
      timer: 1000,
      customClass: {
        popup: "custom_dialog",
        icon: "custom_dialog_icon",
        title: "custom_dialog_title",
      },
    });
  }, [favoriteEpisodeIds.length]);

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
      const fetchData = await getEpisodes(favoriteEpisodeIds);
      if (categoryId === "favorites") {
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
  }, [categoryId, savedShows.length, favoriteEpisodeIds.length]);

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
        onClick={async () => {
          console.log(userInfo);
          console.log(currentShows);
        }}
      >
        debug用按鈕
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
        <EpisodeCard
          key={show.id}
          episode={show}
          onSelect={onSelect}
          publisher={show.show?.name}
        />
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
