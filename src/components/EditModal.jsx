import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EmojiPicker from "emoji-picker-react";

function EditModal({ id, show, onHide, emoji, content, onSave }) {
  const [currentInputValue, setCurrentInputValue] = useState(content);
  const [isOpen, setEmojiOpen] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(emoji);
  const inputRef = useRef(null);

  function handleInputChange(e) {
    setCurrentInputValue(e.target.value);
  }
  function handleKeyDown(e) {
    if (currentInputValue && e.key === "Enter") {
      onSave(currentInputValue, id, currentEmoji);
      onHide();
    }
  }
  function handleSave() {
    if (currentInputValue) {
      // 使用 setTimeout 確保狀態已更新，否則會因為異步更新而無法取得最新的值
      setTimeout(() => {
        onSave(currentInputValue, id, currentEmoji);
        onHide();
      }, 0);
    }
  }
  function handleToggleEmojiPicker() {
    setEmojiOpen(!isOpen);
  }
  function handleSetEmoji(emojiData) {
    const emoji = emojiData.emoji;
    setCurrentEmoji(emoji);
    handleToggleEmojiPicker();
  }

  useEffect(() => {
    function handleClickOutSide(e) {
      if (!e.target.closest(".emoji_selector")) {
        setEmojiOpen(false);
      }
    }

    if (!isOpen) {
      document.removeEventListener("click", handleClickOutSide);
    } else {
      document.addEventListener("click", handleClickOutSide);
    }
  }, [isOpen]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>編輯名稱</Modal.Title>
      </Modal.Header>
      <div className="input_container">
        <div className="emoji_selector">
          <div onClick={handleToggleEmojiPicker}>{currentEmoji}</div>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={handleSetEmoji}
            width={300}
            height={350}
            className="emojiPicker"
          />
        </div>
        <input
          type="text"
          className="editInput"
          defaultValue={content}
          ref={inputRef}
          key="changeTitle"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
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
