import { useUser } from "../Context/UserContext";
import { useEffect } from "react";
import { DefaultStatus, PodcastCard, UserInfo, Player } from "../components";

function Main() {
  const { userInfo, getCategories } = useUser();
  const savedShows = userInfo.savedShows || [];
  const currentCategoryName = userInfo.toShow.id;

  useEffect(() => {
    async function handleMain() {
      await getCategories();
      console.log(savedShows);
    }
    handleMain();
  }, []);

  const isFavorites =
    userInfo.toShow.id === "favorites" || userInfo.toShow.id === undefined;
  const podcastList = savedShows.map((show) => (
    <PodcastCard key={show.id} info={show} />
  ));

  return (
    <div>
      {savedShows === undefined || savedShows.length === 0 ? (
        <DefaultStatus
          categoryId={userInfo.toShow.id}
          name={currentCategoryName}
        />
      ) : (
        <div className="main_container">
          <div className="podcast_container">
            {isFavorites ? <h2>最愛</h2> : podcastList}
          </div>
        </div>
      )}
      <button
        className="console_button"
        onClick={() => {
          console.log(userInfo);
          console.log(userInfo.toShow.id);
          console.log(userInfo.savedShows);
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
