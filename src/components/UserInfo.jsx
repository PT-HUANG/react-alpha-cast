import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { LogoutModal } from "../components";
import styled from "styled-components";

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

  function handleToggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

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

  const handleClose = () => {
    setModalStatus(false);
  };

  const handleShow = () => {
    setModalStatus(true);
  };

  return (
    <div className="userInfo_container" onClick={handleToggleDropdown}>
      {currentMember.display_name && currentMember.images ? (
        <div className="userinfo">
          {currentMember.images[0] ? (
            <img src={currentMember.images[0]?.url} className="avatar" alt="" />
          ) : (
            <div className="default_avatar">
              {currentMember?.display_name[0].toUpperCase()}
            </div>
          )}
          <div className="account">{currentMember.display_name}</div>
          {isDropdownOpen ? (
            <>
              <i className="fa-solid fa-angle-up click-disabled"></i>
              <StyleDropdown className="logout" onClick={handleShow}>
                <li>
                  <div>登出</div>
                </li>
              </StyleDropdown>
            </>
          ) : (
            <i className="fa-solid fa-angle-down click-disabled"></i>
          )}
          <LogoutModal
            show={modalStatus}
            onHide={handleClose}
            onLogout={logout}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserInfo;
