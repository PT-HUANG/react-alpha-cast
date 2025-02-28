import { DefaultStatus, PodcastCard, UserInfo, Player } from "../components";

function Main({ userInfo }) {
  const { toShow, savedShows } = userInfo;
  const categoryId = toShow.id;
  const isFavorites = categoryId === "favorites" || categoryId === undefined;

  return (
    <div>
      {savedShows === undefined || savedShows.length === 0 ? (
        <DefaultStatus categoryId={categoryId} name={categoryId} />
      ) : (
        <div className="main_container">
          {isFavorites ? (
            <div className="favorite_container">
              {savedShows.map((show) => (
                <div key={show.id}>{show.id}</div>
              ))}
            </div>
          ) : (
            <div className="podcast_container">
              {savedShows.map((show) => (
                <PodcastCard key={show.id} info={show} />
              ))}
            </div>
          )}
        </div>
      )}
      <button
        className="console_button"
        onClick={() => {
          console.log(userInfo);
          console.log(categoryId);
          console.log("savedShows", savedShows);
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
