import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CreateModal({ show, onHide, onCreate }) {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const inputRef = useRef(null);

  function handleInputChange(e) {
    setCurrentInputValue(e.target.value);
  }
  function handleSave() {
    if (currentInputValue) {
      const newId = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
      onCreate(newId, currentInputValue);
      onHide();
    }
  }

  function handleKeyDown(e) {
    if (currentInputValue && e.key === "Enter") {
      const newId = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
      setTimeout(() => {
        onCreate(newId, currentInputValue);
        onHide();
      }, 0);
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>新增分類</Modal.Title>
      </Modal.Header>
      <input
        type="text"
        className="createInput"
        placeholder="請輸入分類名稱"
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

export default CreateModal;
