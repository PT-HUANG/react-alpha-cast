import styled from "styled-components";
import { useUser } from "../context/UserContext";

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  border-radius: 1rem;
  border: 1px solid #edf2f7;
  margin: 1rem 0;
  padding: 1rem;
  & img {
    width: 11%;
    height: 11%;
    border-radius: 0.5rem;
  }
`;

const StyledContentContainer = styled.div`
  width: 80%;
  margin-left: 1rem;
`;

const StyledEpisodeTitle = styled.div`
  width: 90%;
`;

const StyledEpisodeDescription = styled.div`
  width: 95%;
  font-size: 0.75rem;
  font-weight: 400;
  margin-top: 0.5rem;
  color: #718096;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 1.2rem;
`;

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  color: #93989a;
  font-size: 0.875rem;
  line-height: 1rem;
  padding-top: 1rem;
  & i {
    color: #ff7f50;
    cursor: pointer;
    font-size: 1.5rem;
    margin: 0 0.5rem;
  }
`;

const StyledBookmark = styled.div`
  position: absolute;
  top: 10%;
  right: 3.5%;
  cursor: pointer;
  color: #ff7f50;
`;

function EpisodeCard({ episode }) {
  const { userInfo, handleFavorite } = useUser();
  const { favoriteEpisodeIds } = userInfo.favorites;

  const { images, name, description, release_date, duration_ms, id } = episode;
  const url = images[0].url;

  function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} 小時 ${minutes} 分`;
  }

  const length = formatTime(duration_ms);

  return (
    <StyledContainer>
      <img src={url} />
      <StyledContentContainer>
        <StyledEpisodeTitle>{name}</StyledEpisodeTitle>
        <StyledEpisodeDescription>{description}</StyledEpisodeDescription>
        <StyledInfo>
          <i className="fa-solid fa-circle-play"></i>
          <span>
            {release_date} · {length}
          </span>
        </StyledInfo>
        <StyledBookmark
          onClick={() => {
            handleFavorite(episode.id);
          }}
        >
          {favoriteEpisodeIds &&
          favoriteEpisodeIds.some((favorite) => favorite.id === id) ? (
            <i className="fa-solid fa-bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark"></i>
          )}
        </StyledBookmark>
      </StyledContentContainer>
    </StyledContainer>
  );
}

export default EpisodeCard;
