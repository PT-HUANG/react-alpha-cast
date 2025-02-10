import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditModal({ id, show, onHide, emoji, content, onDelete }) {
  function handleDelete() {
    onDelete(id);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>刪除分類</Modal.Title>
      </Modal.Header>
      <div className="deleteContent">
        {`您確定要繼續刪除 ${emoji} ${content} 分類嗎?`}
      </div>
      <Modal.Footer>
        <Button variant="light" className="btn-cancel" onClick={onHide}>
          取消
        </Button>
        <Button
          variant="primary"
          className="btn-save"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          刪除
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
