import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CreateModal({ show, onHide, onLogout }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>登出</Modal.Title>
      </Modal.Header>
      <div className="logoutContent">確認是否要登出?</div>
      <Modal.Footer>
        <Button variant="light" className="btn-cancel" onClick={onHide}>
          取消
        </Button>
        <Button variant="primary" className="btn-save" onClick={onLogout}>
          確定
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateModal;
