import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { LogoutModal } from "../components";
import styled from "styled-components";

const StyleUserInfo = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 184px;
  height: 48px;
  background-color: #fafafa;
  border-radius: 25px;
  cursor: pointer;
`;

const StyleAvatar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 25%;
  border-radius: 25px;
  background-color: ${({ src }) => (src ? "transparent" : "#1ed760")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;

  img {
    width: 100%;
    height: 100%;
    border-radius: 25px;
  }
`;

const StyleAccount = styled.div`
  margin: 0 0.5rem;
  margin-left: 25%;
`;

const StyleDropdown = styled.ul`
  position: absolute;
  z-index: 999;
  top: 120%;
  left: 0%;
  width: 180px;
  border-radius: 8px;
  background-color: #fefefe;
  color: #111111;
  padding-left: 0;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  li {
    padding: 1rem;
  }

  li:hover {
    color: #ff7f50;
  }

  li:nth-child(2) {
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }
`;

function UserInfo() {
  const { currentMember, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);

  const handleToggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const handleShow = () => setModalStatus(true);
  const handleClose = () => setModalStatus(false);

  useEffect(() => {
    function handleClickOutSide(e) {
      if (!e.target.closest(".userInfo_container")) {
        setIsDropdownOpen(false);
      }
    }
    if (!isDropdownOpen) {
      document.removeEventListener("click", handleClickOutSide);
    } else {
      document.addEventListener("click", handleClickOutSide);
    }
  }, [isDropdownOpen]);

  const { display_name, images } = currentMember;
  const avatarUrl = images?.[0]?.url;

  return (
    <div className="userInfo_container" onClick={handleToggleDropdown}>
      {display_name && images ? (
        <StyleUserInfo>
          <StyleAvatar src={avatarUrl}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" />
            ) : (
              display_name[0].toUpperCase()
            )}
          </StyleAvatar>
          <StyleAccount>{display_name}</StyleAccount>
          <i
            className={`fa-solid fa-angle-${
              isDropdownOpen ? "up" : "down"
            } click-disabled`}
          />
          {isDropdownOpen && (
            <StyleDropdown className="logout" onClick={handleShow}>
              <li>登出</li>
            </StyleDropdown>
          )}
          <LogoutModal
            show={modalStatus}
            onHide={handleClose}
            onLogout={logout}
          />
        </StyleUserInfo>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserInfo;
