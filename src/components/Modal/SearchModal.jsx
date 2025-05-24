import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { searchPodcast } from "../../api/spotify";
import { SearchResult } from "../../components";
import { useUser } from "../../context/UserContext";
import InfiniteScroll from "react-infinite-scroll-component";

function SearchModal({ categoryId, show, onHide }) {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [podcasts, setPodcasts] = useState([]);
  const [isChosen, setIsChosen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [offset, setOffset] = useState(0);

  const inputRef = useRef(null);
  const { addShow } = useUser();

  useEffect(() => {
    if (podcasts.length === 0 && currentInputValue) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [podcasts.length]);

  function handleInputChange(e) {
    setCurrentInputValue(e.target.value);
  }

  async function handleSpotifySearch() {
    const result = await searchPodcast(currentInputValue, offset);
    const nextPodcasts = result.shows.items.map((item) => {
      return { ...item, isSelected: false };
    });
    setPodcasts(nextPodcasts);
    setIsChosen(false);
    setOffset((prev) => prev + 20);
  }

  const handleSearchMore = async () => {
    const result = await searchPodcast(currentInputValue, offset);
    const nextPodcasts = result.shows.items.map((item) => {
      return { ...item, isSelected: false };
    });
    setPodcasts([...podcasts, ...nextPodcasts]);
    setIsChosen(false);
    setOffset((prev) => prev + 20);
  };

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
      setPodcasts([]);
      setIsSearching(true);
      setTimeout(() => {
        handleSpotifySearch();
      }, 1500);
    }
  }

  async function handleSearch() {
    if (currentInputValue) {
      setPodcasts([]);
      setIsSearching(true);
      setTimeout(() => {
        handleSpotifySearch();
      }, 1500);
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
      <div className="result_container" id="scrollableDiv">
        <InfiniteScroll
          dataLength={podcasts.length}
          next={() => {
            setTimeout(handleSearchMore, 1000);
          }}
          hasMore={true}
          scrollableTarget="scrollableDiv"
          className="infinitescroll"
        ></InfiniteScroll>
        {podcasts
          ? podcasts.map((p) => {
              return (
                <SearchResult
                  key={p.id}
                  info={p}
                  $isSelected={p.isSelected}
                  onSelect={hadleSelect}
                />
              );
            })
          : ""}
        {isSearching && <span className="search_loader"></span>}
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
