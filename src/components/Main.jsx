import UserInfo from "./UserInfo";
import Player from "./Player";
import { useUser } from "../Context/UserContext";
import { useEffect } from "react";
import { DefaultStatus } from "../components";

function Main() {
  const { userInfo, getCategories } = useUser();

  useEffect(() => {
    async function handleMain() {
      await getCategories();
    }
    handleMain();
  }, []);

  return (
    <div>
      {userInfo.toShow.savedShows == {} ? (
        <div className="main_container">{userInfo.toShow.name}</div>
      ) : (
        <DefaultStatus id={userInfo.toShow.id} />
      )}
      <button
        onClick={() => {
          console.log(userInfo);
          console.log(userInfo.toShow);
        }}
      >
        Console
      </button>
      <UserInfo />
      <Player />
    </div>
  );
}

export default Main;
