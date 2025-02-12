import { logoutClick, getProfile, isTokenValid } from "../api/Spotify";
import { useAuth } from "../context/AuthContext";

function UserInfo() {
  const { currentMember, logout } = useAuth();

  return (
    <div className="userInfo_container">
      <div>使用者資訊</div>
      <button onClick={logout}>登出</button>
    </div>
  );
}

export default UserInfo;
