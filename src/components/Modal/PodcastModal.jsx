import { EpisodeCard } from "../../components";
import Modal from "react-bootstrap/Modal";
import { useUser } from "../../Context/UserContext";
import styled from "styled-components";

const StyledEpisodeContainer = styled.div`
  padding: 1rem;
  padding-top: 0;
  width: 100%;
  height: 50vh;
  overflow-y: scroll;
`;

function PodcastModal({ show, onHide, info, episodes }) {
  const { images, name, publisher, id, description } = info;
  const { url } = images[1];
  const { removeShow, userInfo } = useUser();
  const categoryId = userInfo.toShow.id;
  const showId = id;

  async function handleRemoveShow() {
    await removeShow(categoryId, showId);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} dialogClassName="podcast_modal">
      <Modal.Header closeButton>
        <Modal.Title className="podcast_title">
          <img src={url} className="podcast_image" />
          <div className="podcast_text">
            <div className="podcast_name">{name}</div>
            <div className="podcast_subtitle">{publisher}</div>
            <div className="podcast_description">{description}</div>
            <button className="podcast_delete" onClick={handleRemoveShow}>
              刪除
            </button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <StyledEpisodeContainer>
        <div className="episodeInfo">
          {episodes
            ? episodes.map((episode) => {
                return <EpisodeCard key={episode.id} episode={episode} />;
              })
            : ""}
        </div>
      </StyledEpisodeContainer>
    </Modal>
  );
}

export default PodcastModal;
