import styled from "styled-components";
import { useState, useEffect } from "react";
import { EditModal, DeleteModal, SearchModal } from "../components";
import { useUser } from "../Context/UserContext";
import { createPortal } from "react-dom";

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

const StyleDropdown = styled.ul`
  position: absolute;
  z-index: 999;
  top: ${(props) => props.$position.top}px;
  left: ${(props) => props.$position.left}px;
  width: 180px;
  border-radius: 8px;
  background-color: #fefefe;
  color: #111111;
  padding-left: 0;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  li {
    padding: 20px;
    font-weight: 500;
  }

  li:hover {
    color: #ff7f50;
  }

  li:nth-child(2) {
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }
`;

function Category({ id, emoji, name, isSelected }) {
  const [isVisible, setIsVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState({
    edit: false,
    delete: false,
    search: false,
  });
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const { selectCategory } = useUser();

  function handleToggleOption(e) {
    setIsVisible(!isVisible);
    setPosition({ top: e.clientY, left: e.clientX });
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
      onClick={() => selectCategory(id)}
    >
      <div className="category_title">
        <span className="category_emoji">{emoji}</span>
        <StyledContent className="category_content" $isSelected={isSelected}>
          {name}
        </StyledContent>
      </div>
      <StyledOption
        className="category_option"
        $isSelected={isSelected}
        onClick={(e) => {
          handleToggleOption(e);
        }}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
        {isVisible &&
          isSelected &&
          createPortal(
            <StyleDropdown $position={position}>
              <li onClick={() => handleShow("edit")}>編輯名稱</li>
              <li onClick={() => handleShow("delete")}>刪除分類</li>
              <li onClick={() => handleShow("search")}>新增 Podcast</li>
            </StyleDropdown>,
            document.body
          )}
      </StyledOption>
      <EditModal
        id={id}
        show={modalStatus.edit}
        onHide={() => handleClose("edit")}
        emoji={emoji}
        name={name}
      />
      <DeleteModal
        id={id}
        show={modalStatus.delete}
        onHide={() => handleClose("delete")}
        title="刪除分類"
        emoji={emoji}
        name={name}
      />
      <SearchModal
        categoryId={id}
        show={modalStatus.search}
        onHide={() => handleClose("search")}
      />
    </StyledCategoryContainer>
  );
}

export default Category;
