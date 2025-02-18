import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { searchPodcast } from "../../api/spotify";

function SearchModal({ id, show, onHide }) {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [podcasts, setPodcasts] = useState([]);
  const inputRef = useRef(null);

  function handleInputChange(e) {
    setCurrentInputValue(e.target.value);
  }

  async function handleSpotifySearch(str) {
    if (currentInputValue.length) {
      const result = await searchPodcast(str);
      setPodcasts(result.shows.items);
      console.log(podcasts);
    }
  }

  // 這邊邏輯要修正
  function handleSave() {
    if (currentInputValue) {
      onHide();
    }
  }

  // 這邊邏輯要修正
  function handleKeyDown(e) {
    if (currentInputValue && e.key === "Enter") {
      handleSpotifySearch(currentInputValue);
    }
  }

  return (
    <Modal show={show} onHide={onHide} dialogClassName="search_modal">
      <Modal.Header closeButton>
        <Modal.Title className="search_title">新增 Podcast</Modal.Title>
      </Modal.Header>
      <i className="fa-solid fa-magnifying-glass search_icon"></i>
      <input
        type="text"
        className="searchInput"
        placeholder="開始搜尋..."
        ref={inputRef}
        key="changeTitle"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      ></input>
      {podcasts
        ? podcasts.map((p) => {
            return <div key={p.id}>{p.name}</div>;
          })
        : ""}
      <Modal.Footer>
        <Button variant="light" className="btn-cancel" onClick={onHide}>
          取消
        </Button>
        <Button
          variant="primary"
          className="btn-save"
          onClick={(e) => {
            e.stopPropagation();
            handleSave();
          }}
        >
          確認新增
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchModal;
