import { useUser } from "../Context/UserContext";
import { useEffect } from "react";
import { DefaultStatus, PodcastCard, UserInfo, Player } from "../components";

function Main() {
  const { userInfo, getCategories } = useUser();
  const savedShows = userInfo.savedShows || [];

  useEffect(() => {
    async function handleMain() {
      await getCategories();
      console.log(savedShows);
    }
    handleMain();
  }, []);

  return (
    <div>
      {savedShows === undefined || savedShows.length === 0 ? (
        <DefaultStatus categoryId={userInfo.toShow.id} />
      ) : (
        <div className="main_container">
          <div className="podcast_container">
            {savedShows.map((show) => {
              return <PodcastCard key={show.id} info={show} />;
            })}
          </div>
        </div>
      )}
      <button
        className="console_button"
        onClick={() => {
          console.log(userInfo);
          console.log(userInfo.toShow);
          console.log(savedShows);
        }}
      >
        Console
      </button>
      <UserInfo />
      {/* <Player /> */}
    </div>
  );
}

export default Main;
