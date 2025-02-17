import UserInfo from "./UserInfo";
import Player from "./Player";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

function Main() {
  const { userInfo } = useUser();

  return (
    <div>
      {userInfo.toShow ? (
        <div className="main_container">{userInfo.toShow.name}</div>
      ) : (
        ""
      )}
      <UserInfo />
      <Player />
    </div>
  );
}

export default Main;
