import { logoutClick } from "../api/spotify";

function UserInfo() {
  return (
    <div className="userInfo_container">
      <div>使用者資訊</div>
      <button onClick={logoutClick}>登出</button>
    </div>
  );
}

export default UserInfo;
