import { CreateModal } from "../components";
import { useState } from "react";

function AddCategory({ onCreate }) {
  const [modalStatus, setModalStatus] = useState(false);

  const handleClose = () => {
    setModalStatus(false);
  };

  const handleShow = () => {
    setModalStatus(true);
  };
  return (
    <>
      <div className="addCategory" onClick={handleShow}>
        <div className="addCategory_title">
          <i className="fa-solid fa-plus"></i>
          <span className="addCategory_content">新增分類</span>
        </div>
      </div>
      <CreateModal
        show={modalStatus}
        onHide={handleClose}
        onCreate={onCreate}
      />
    </>
  );
}

export default AddCategory;
