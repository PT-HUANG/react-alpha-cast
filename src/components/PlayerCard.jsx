import styled from "styled-components";
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
  position: relative;
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
  .playbutton {
    position: absolute;
    top: 110%;
    color: #ff7f50;
    cursor: pointer;
    font-size: 2rem;
  }
  .favorite_button {
    position: absolute;
    top: -10%;
    right: 5%;
    cursor: pointer;
    color: #ff7f50;
  }
`;

function PlayerCard() {
  const { userInfo, handleFavorite } = useUser();
  const { handlePlayPause, currentEpisode } = usePlayer();

  const { favoriteEpisodeIds } = userInfo.favorites;
  const { images, name, description, release_date, duration_ms, id, show } =
    currentEpisode;
  const url = images[0].url;
  const author = show.name;

  function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} 小時 ${minutes} 分`;
  }
  const length = formatTime(duration_ms);

  return (
    <StyledContainer>
      <StyledTitle>
        <img src={url} />
        <div>{name}</div>
      </StyledTitle>
      <StyledContent>
        <div className="author">{author}</div>
        <div className="date_length">
          {release_date} · {length}
        </div>
        <div className="description">{description}</div>
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
        <div
          className="favorite_button"
          onClick={() => {
            handleFavorite(currentEpisode.id);
          }}
        >
          {favoriteEpisodeIds &&
          favoriteEpisodeIds.some((favorite) => favorite.id === id) ? (
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
