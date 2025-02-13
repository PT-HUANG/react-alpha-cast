import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { LogoutModal } from "../components";

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
          <img src={currentMember.images[1].url} className="avatar" alt="" />
          <div className="account">{currentMember.display_name}</div>
          {isDropdownOpen ? (
            <>
              <i className="fa-solid fa-angle-up click-disabled"></i>
              <ul className="dropdown logout">
                <li>
                  <div onClick={handleShow}>登出</div>
                </li>
              </ul>
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
