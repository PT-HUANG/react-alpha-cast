import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useUser } from "../../Context/UserContext";

function PodcastModal({ show, onHide, info }) {
  const { images, name, publisher, id, description } = info;
  const { height, url, width } = images[1];

  return (
    <Modal show={show} onHide={onHide} dialogClassName="podcast_modal">
      <Modal.Header closeButton>
        <Modal.Title className="podcast_title">
          <img src={url} className="podcast_image" />
          <div className="podcast_text">
            <div className="podcast_name">{name}</div>
            <div className="podcast_subtitle">{publisher}</div>
            <div className="podcast_description">{description}</div>
            <button className="podcast_delete">刪除</button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <div className="result_container"></div>
    </Modal>
  );
}

export default PodcastModal;
