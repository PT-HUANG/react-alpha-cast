import UserInfo from "./UserInfo";
import Player from "./Player";
import { useUser } from "../Context/UserContext";
import { useEffect } from "react";
import { DefaultStatus } from "../components";

function Main() {
  const { userInfo, getCategories, getShows } = useUser();
  const savedShows = userInfo.toShow.savedShows;

  useEffect(() => {
    async function handleMain() {
      await getCategories();
    }
    handleMain();
  }, [userInfo]);

  return (
    <div>
      {savedShows === undefined || savedShows.length === 0 ? (
        <DefaultStatus categoryId={userInfo.toShow.id} />
      ) : (
        <div className="main_container">
          {savedShows.map((show) => {
            return <div key={show.id}>{show.id}</div>;
          })}
        </div>
      )}
      <button
        onClick={() => {
          console.log(userInfo);
          console.log(userInfo.toShow);
          console.log("儲存的Podcast節目ID: ", savedShows);
        }}
      >
        Console
      </button>
      <button
        onClick={() => {
          getShows(savedShows);
        }}
      >
        印出Show
      </button>
      <UserInfo />
      {/* <Player /> */}
    </div>
  );
}

export default Main;
