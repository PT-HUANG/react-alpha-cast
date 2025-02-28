import empty from "../assets/images/empty.png";
import styled from "styled-components";
import SearchModal from "./Modal/SearchModal";
import { useState } from "react";

const StyledContainer = styled.div`
  width: 32.2%;
  position: absolute;
  top: 10%;
  left: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.div`
  margin: 1rem 0 2rem 0;
  font-size: 1.125rem;
  color: #718096;
`;

const StyledButton = styled.div`
  background-color: #ff7f50;
  border-radius: 8px;
  padding: 0.75rem 2.5rem;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #e86231; /* 改變背景顏色 */
  }
`;

function DefaultStatus() {
  const [modalStatus, setModalStatus] = useState(false);
  const categoryId = localStorage.getItem("selectedCategoryId");

  const handleClose = () => {
    setModalStatus(false);
  };

  const handleShow = () => {
    setModalStatus(true);
  };

  return (
    <>
      <StyledContainer>
        <img src={empty} alt="emoty_folder" className="empty_icon" />
        {categoryId === "favorites" ? (
          <StyledTitle>您尚未收藏任何Podcast</StyledTitle>
        ) : (
          <>
            <StyledTitle>
              您尚未加入任何 Podcast，可以點擊按鈕新增！
            </StyledTitle>
            <StyledButton onClick={handleShow}>新增Podcast</StyledButton>
          </>
        )}
      </StyledContainer>
      <SearchModal
        categoryId={categoryId}
        show={modalStatus}
        onHide={handleClose}
      />
    </>
  );
}

export default DefaultStatus;
