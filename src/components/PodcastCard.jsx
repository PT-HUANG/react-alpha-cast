import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { PodcastModal } from ".";
import { getShowEpisodes } from "../api/spotify";
import { usePlayer } from "../context/PlayerContext";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 8px;
  margin: 0.5rem;
  padding-top: 1rem;
  box-shadow: 24px 8px 24px 0px #c7c7c73d;
  cursor: pointer;
  max-height: 300px;
  & img {
    max-width: 70%;
    border-radius: 8px;
    margin: 0 auto;
  }
`;

const StyledImage = styled.img`
  width: 80%;
`;

const StyledTitle = styled.div`
  margin: 0.5rem 1rem;
  margin-bottom: 0;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledSubtitle = styled.div`
  margin: 0.5rem 1rem;
  margin-top: 0;
  color: #93989a;
  font-size: 0.75rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
`;

function PodcastCard({ info }) {
  const [modalStatus, setModalStatus] = useState(false);
  const [currentEpisodes, setCurrentEpisodes] = useState([]);
  const { playingEpisodeId } = usePlayer();
  const { images, name, publisher, id } = info;
  const { url } = images[1];
  const [offset, setOffset] = useState(0);

  const handleClose = () => {
    setModalStatus(false);
  };

  const handleShow = async () => {
    setModalStatus(true);
    const { items } = await getShowEpisodes(id, 0);
    const validItems = items.filter((item) => item !== null);
    const formattedData = validItems.map((item) => {
      return { ...item, isSelected: false, isNowPlaying: false };
    });
    setOffset((prev) => prev + 20);
    setCurrentEpisodes(formattedData);
  };

  const fetchMoreData = async () => {
    const { items } = await getShowEpisodes(id, offset);
    const validItems = items.filter((item) => item !== null);
    const formattedData = validItems.map((item) => {
      return { ...item, isSelected: false, isNowPlaying: false };
    });
    setOffset((prev) => prev + 20);
    setCurrentEpisodes((prevEpisodes) => [...prevEpisodes, ...formattedData]);
  };

  const handleSelect = (episodeId) => {
    const nextEpisodes = currentEpisodes.map((episode) => {
      if (episode.id === episodeId) {
        return { ...episode, isSelected: true };
      } else {
        return { ...episode, isSelected: false };
      }
    });
    setCurrentEpisodes(nextEpisodes);
  };

  useEffect(() => {
    const nextEpisodes = currentEpisodes.map((episode) => ({
      ...episode,
      isNowPlaying: episode.id === playingEpisodeId,
    }));
    setCurrentEpisodes(nextEpisodes);
  }, [playingEpisodeId, currentEpisodes.length]);

  return (
    <StyledContainer>
      <StyledImage src={url} />
      <StyledTitle>{name}</StyledTitle>
      <StyledSubtitle>{publisher}</StyledSubtitle>
      <Button className="card_button" variant="primary" onClick={handleShow}>
        更多
      </Button>
      <PodcastModal
        show={modalStatus}
        onHide={handleClose}
        onSelect={handleSelect}
        info={info}
        episodes={currentEpisodes}
        fetchMoreData={fetchMoreData}
      />
    </StyledContainer>
  );
}

export default PodcastCard;
