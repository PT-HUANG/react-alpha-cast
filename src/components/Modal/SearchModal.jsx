import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { searchPodcast } from "../../api/spotify";
import { PodcastCard } from "../../components";
import { useUser } from "../../Context/UserContext";

function SearchModal({ categoryId, show, onHide }) {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [podcasts, setPodcasts] = useState([]);
  const [isChosen, setIsChosen] = useState(false);
  const inputRef = useRef(null);
  const { addShow } = useUser();

  function handleInputChange(e) {
    setCurrentInputValue(e.target.value);
  }

  async function handleSpotifySearch() {
    const result = await searchPodcast(currentInputValue);
    const nextPodcasts = result.shows.items.map((item) => {
      return { ...item, isSelected: false };
    });
    setPodcasts(nextPodcasts);
    setIsChosen(false);
    console.log(podcasts);
  }

  function hadleSelect(showId) {
    const nextPodcasts = podcasts.map((podcast) => {
      if (podcast.id === showId) {
        return { ...podcast, isSelected: true };
      } else return { ...podcast, isSelected: false };
    });
    setPodcasts(nextPodcasts);
    setIsChosen(true);
  }

  function handleSave() {
    const showId = podcasts.find((p) => {
      return p.isSelected === true;
    }).id;
    if (showId) {
      addShow(categoryId, showId);
      onHide();
    }
  }

  async function handleKeyDown(e) {
    if (currentInputValue && e.key === "Enter") {
      await handleSpotifySearch();
    }
  }

  async function handleSearch() {
    if (currentInputValue) {
      await handleSpotifySearch();
    }
  }

  return (
    <Modal show={show} onHide={onHide} dialogClassName="search_modal">
      <Modal.Header closeButton>
        <Modal.Title className="search_title">新增 Podcast</Modal.Title>
      </Modal.Header>
      <div className="searchbar">
        <i
          className="fa-solid fa-magnifying-glass search_icon"
          onClick={handleSearch}
        ></i>
        <input
          type="text"
          className="searchInput"
          placeholder="開始搜尋 ..."
          ref={inputRef}
          key="changeTitle"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></input>
        {podcasts.length !== 0 && <div className="result_title">搜尋結果</div>}
      </div>
      <div className="result_container">
        {podcasts
          ? podcasts.map((p) => {
              return (
                <PodcastCard
                  key={p.id}
                  info={p}
                  $isSelected={p.isSelected}
                  onSelect={hadleSelect}
                />
              );
            })
          : ""}
      </div>
      <Modal.Footer>
        <Button variant="light" className="btn-cancel" onClick={onHide}>
          取消
        </Button>
        <Button
          variant="primary"
          className={isChosen ? "btn-save" : "btn-save disabled"}
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
