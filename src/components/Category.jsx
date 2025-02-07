import styled from "styled-components";
import { useState, useEffect } from "react";
import { EditModal, DeleteModal } from "../components";

const StyledCategoryContainer = styled.div`
  background-color: ${(props) => (props.$isSelected ? "#111111" : "#F6F7F8")};
`;

const StyledContent = styled.span`
  color: ${(props) => (props.$isSelected ? "#FEFEFE" : "#718096")};
`;

const StyledOption = styled.div`
  width: 30px;
  color: ${(props) => (props.$isSelected ? "#FFFFFF" : "#71809680")};
`;

function Category({
  id,
  emoji,
  content,
  isSelected,
  onClick,
  onSave,
  onDelete,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState({
    edit: false,
    delete: false,
  });

  function handleToggleOption() {
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    function handleClickOutSide(e) {
      if (!e.target.closest(".category_option")) {
        setIsVisible(false);
      }
    }

    if (!isVisible || !isSelected) {
      document.removeEventListener("click", handleClickOutSide);
    } else {
      document.addEventListener("click", handleClickOutSide);
    }
  }, [isVisible]);

  const handleClose = (modalName) => {
    setModalStatus({ ...modalStatus, [modalName]: false });
  };

  const handleShow = (modalName) => {
    setModalStatus({ ...modalStatus, [modalName]: true });
  };

  return (
    <StyledCategoryContainer
      className="category"
      $isSelected={isSelected}
      onClick={onClick}
    >
      <div className="category_title">
        <span className="category_emoji">{emoji}</span>
        <StyledContent className="category_content" $isSelected={isSelected}>
          {content}
        </StyledContent>
      </div>
      <StyledOption
        className="category_option"
        $isSelected={isSelected}
        onClick={handleToggleOption}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
        {isVisible && isSelected ? (
          <ul className="dropdown">
            <li onClick={() => handleShow("edit")}>編輯名稱</li>
            <li onClick={() => handleShow("delete")}>刪除分類</li>
            <li>新增 Podcast</li>
          </ul>
        ) : null}
      </StyledOption>
      <EditModal
        id={id}
        show={modalStatus.edit}
        onHide={() => handleClose("edit")}
        emoji={emoji}
        content={content}
        onSave={onSave}
      />
      <DeleteModal
        id={id}
        show={modalStatus.delete}
        onHide={() => handleClose("delete")}
        title="刪除分類"
        emoji={emoji}
        content={content}
        onDelete={onDelete}
      />
    </StyledCategoryContainer>
  );
}

export default Category;
