import {
  DefaultStatus,
  EpisodeCard,
  PodcastCard,
  UserInfo,
  Player,
} from "../components";
import { useEffect, useState } from "react";
import { getEpisodes } from "../api/spotify";
import { usePlayer } from "../context/PlayerContext";
import { useNavbar } from "../context/NavbarContext";
import Swal from "sweetalert2";
import styled from "styled-components";

const StyleToggleButton = styled.div`
  position: absolute;
  top: 4%;
  left: 4%;
  width: 30px;
  height: 30px;
  font-size: 1.75rem;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Greetings = styled.h2`
  position: absolute;
  top: 3.5%;
  left: 14%;
  font-weight: 700;
  @media screen and (min-width: 768px) {
    left: -4%;
    padding-left: 2rem;
  }
`;

function Main({ userInfo }) {
  const categoryId = localStorage.getItem("selectedCategoryId");
  const { savedShows, favorites, message } = userInfo;
  const { favoriteEpisodeIds } = favorites;
  const [currentShows, setCurrentShows] = useState([]);
  const [greetings, setGreetings] = useState("");
  const { currentEpisode } = usePlayer();
  const { handleToggleNavbar } = useNavbar();

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
      if (categoryId === "favorites") {
        const fetchData = await getEpisodes(favoriteEpisodeIds);
        const formattedData = fetchData.map((data) => {
          return { ...data, isSelected: false };
        });
        setCurrentShows(formattedData);
      } else {
        setCurrentShows(savedShows.shows);
      }
    }
    getGreetings();
    handleFetchShows();
  }, [categoryId, savedShows.shows?.length, favoriteEpisodeIds.length]);

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
      <StyleToggleButton onClick={handleToggleNavbar}>
        <i className="fa-solid fa-bars"></i>
      </StyleToggleButton>
      <Greetings>{greetings}</Greetings>
      <UserInfo />
      {currentShows?.length ? (
        <>
          {categoryId === "favorites" ? (
            <FavoriteList shows={currentShows} onSelect={handleSelectEpisode} />
          ) : (
            <PodcastList shows={currentShows} />
          )}
        </>
      ) : (
        <DefaultStatus />
      )}
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
