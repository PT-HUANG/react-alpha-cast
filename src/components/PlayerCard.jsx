import styled from "styled-components";
import { useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { usePlayer } from "../Context/PlayerContext";
const StyledContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 0%;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  margin: 1rem 0;
  padding: 1rem;
`;

const StyledTitle = styled.div`
  display: flex;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  height: 22%;
  & div {
    margin-top: 0.5rem;
    margin-left: 1rem;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 1.2rem;
  }
  & img {
    max-width: 30%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const StyledContent = styled.div`
  margin-top: 1.5rem;
  .author {
    color: #30a9de;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .date_length {
    font-size: 0.75rem;
    color: #93989a;
  }
  .description {
    font-size: 0.75rem;
    color: #93989a;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    line-height: 1.2rem;
  }
  .favorite_button {
    position: absolute;
    top: 30%;
    right: 10%;
    cursor: pointer;
    color: #ff7f50;
  }
`;

const StyledEpisodeControl = styled.div`
  position: absolute;
  top: 72.5%;
  width: 90%;
  .playbutton {
    color: #ff7f50;
    cursor: pointer;
    font-size: 2rem;
  }
  .timer {
    font-size: 0.75rem;
    font-weight: 700;
  }
`;

const StyledProgressBar = styled.div`
  position: relative;
  width: 70%;
  height: 4px;
  background-color: #cccccc;
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressFill = styled.div.attrs((props) => ({
  style: {
    width: `${props.progress}`,
  },
}))`
  height: 100%;
  background-color: #ff7f50;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
`;

function PlayerCard() {
  const { userInfo, handleFavorite } = useUser();
  const {
    handleRestart,
    handlePlayPause,
    currentEpisode,
    episodePlayedSeconds,
  } = usePlayer();

  const { favoriteEpisodeIds } = userInfo.favorites;
  const {
    images,
    name,
    description,
    release_date,
    duration_ms: episodeDuration,
    id,
    show,
  } = currentEpisode;
  const url = images[0].url;
  const author = show.name;

  function formatEpisodeLength(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} 小時 ${minutes} 分`;
  }
  const episodeLength = formatEpisodeLength(episodeDuration);

  function formatEpisodeTimer(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(((ms % (1000 * 60 * 60)) % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
  const runningSeconds = formatEpisodeTimer(episodePlayedSeconds);
  const episodeTotalDuration = formatEpisodeTimer(episodeDuration);
  const progress =
    ((episodePlayedSeconds / episodeDuration) * 100).toFixed(2).toString() +
    "%";

  useEffect(() => {
    if (runningSeconds === episodeTotalDuration) {
      handleRestart(currentEpisode);
    }
  }, [runningSeconds]);

  return (
    <StyledContainer>
      <StyledTitle>
        <img src={url} />
        <div>{name}</div>
      </StyledTitle>
      <StyledContent>
        <div className="author">{author}</div>
        <div className="date_length">
          {release_date} · {episodeLength}
        </div>
        <div className="description">{description}</div>
        <StyledEpisodeControl progress={progress} className="episode_control">
          <i
            className={
              currentEpisode.isPlaying
                ? "fa-solid fa-circle-pause playbutton"
                : "fa-solid fa-circle-play playbutton"
            }
            onClick={() => {
              handlePlayPause(currentEpisode);
            }}
          ></i>
          <div className="timer">
            {runningSeconds} / {episodeTotalDuration}
          </div>
          <StyledProgressBar className="progressbar">
            <ProgressFill progress={progress} />
          </StyledProgressBar>
        </StyledEpisodeControl>
        <div
          className="favorite_button"
          onClick={() => {
            handleFavorite(currentEpisode.id);
          }}
        >
          {favoriteEpisodeIds.some((favorite) => favorite.id === id) ? (
            <i className="fa-solid fa-bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark"></i>
          )}
        </div>
      </StyledContent>
    </StyledContainer>
  );
}

export default PlayerCard;
