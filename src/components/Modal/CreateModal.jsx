import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUser } from "../../Context/UserContext";

function CreateModal({ show, onHide }) {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const inputRef = useRef(null);
  const { createCategory } = useUser();

  function handleInputChange(e) {
    setCurrentInputValue(e.target.value);
  }
  function handleSave() {
    if (currentInputValue) {
      createCategory(currentInputValue);
      onHide();
    }
  }

  function handleKeyDown(e) {
    if (currentInputValue && e.key === "Enter") {
      createCategory(currentInputValue);
      onHide();
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
