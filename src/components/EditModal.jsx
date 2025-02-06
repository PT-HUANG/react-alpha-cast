import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditModal({ id, show, onHide, content, onSave }) {
  const [currentInputValue, setCurrentInputValue] = useState(content);
  const inputRef = useRef(null);

  function handleInputChange(e) {
    setCurrentInputValue(e.target.value);
  }
  function handleKeyDown(e) {
    if (currentInputValue && e.key === "Enter") {
      onSave(currentInputValue, id);
      onHide();
    }
  }
  function handleSave() {
    if (currentInputValue) {
      // 使用 setTimeout 確保狀態已更新，否則會因為異步更新而無法取得最新的值
      setTimeout(() => {
        onSave(currentInputValue, id);
        onHide();
      }, 0);
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>編輯名稱</Modal.Title>
      </Modal.Header>
      <input
        type="text"
        className="editInput"
        defaultValue={content}
        ref={inputRef}
        key="changeTitle"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      ></input>
      <Modal.Footer>
        <Button variant="light" className="btn-cancel" onClick={onHide}>
          取消
        </Button>
        <Button variant="primary" className="btn-save" onClick={handleSave}>
          儲存
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
