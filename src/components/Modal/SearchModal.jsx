import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SearchModal({ id, show, onHide }) {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const inputRef = useRef(null);

  function handleInputChange(e) {
    setCurrentInputValue(e.target.value);
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
      onHide();
    }
  }

  return (
    <Modal show={show} onHide={onHide} dialogClassName="search_modal">
      <Modal.Header closeButton>
        <Modal.Title>新增 Podcast</Modal.Title>
      </Modal.Header>
      <input
        type="text"
        className="createInput"
        placeholder="開始搜尋..."
        ref={inputRef}
        key="changeTitle"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      ></input>
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
          儲存
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchModal;
