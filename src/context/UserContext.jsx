import { useState, useContext, createContext } from "react";

import {
  getUserInfo as fetchUserInfo,
  getCategories as fetchCategories,
  createCategory,
  updateCategoryName,
  deleteCategory,
  addShow,
  removeShow,
  saveToFavorite,
  removeFromFavorite,
} from "../api/AC";

import { getShows, getShowEpisodes, getEpisodes } from "../api/Spotify";

const defaultUserContext = {
  userInfo: null,
  getCategories: null,
  createCategory: null,
  selectCategory: null,
  editCategory: null,
  deleteCategory: null,
  addShow: null,
};

const UserContext = createContext(defaultUserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    categories: [],
    favorites: {
      id: "favorites",
      name: "已收藏",
      favoriteEpisodeIds: [],
      isSelected: false,
    },
    toShow: {},
    savedShows: [],
  });

  return (
    <UserContext.Provider
      value={{
        userInfo,
        getCategories: async () => {
          const { categories } = await fetchCategories();
          const { favoriteEpisodeIds } = await fetchUserInfo();

          const defaultCategories = [
            "🚌通勤清單",
            "📚學習清單",
            "💤睡前清單",
            "🏘️我的Podcast",
          ];

          const handleCategories = async (categories) => {
            categories.sort((a, b) => {
              return Number(a.id) - Number(b.id);
            });

            const lastSelectedId = localStorage.getItem("selectedCategoryId");

            const toShow =
              categories.find(
                (c, id) =>
                  c.id === lastSelectedId || (id === 0 && !lastSelectedId)
              ) || {};

            const nextToshow =
              lastSelectedId === "favorites" ? userInfo.favorites : toShow;

            const nextsavedShows =
              toShow.savedShows && toShow.savedShows.length > 0
                ? await getShows(toShow.savedShows)
                : [];

            setUserInfo({
              ...userInfo,
              categories: categories.map((c, id) => {
                return {
                  ...c,
                  name: c.name.slice(2),
                  emoji: c.name.slice(0, 2),
                  isSelected:
                    c.id === lastSelectedId || (id === 0 && !lastSelectedId),
                };
              }),
              favorites: {
                ...userInfo.favorites,
                favoriteEpisodeIds,
                isSelected: lastSelectedId === "favorites" ? true : false,
              },
              toShow: nextToshow,
              savedShows: nextsavedShows || [],
            });
          };

          if (categories.length === 0) {
            const isDefault = true;
            for (const category of defaultCategories) {
              await createCategory(category, isDefault);
            }
            const { categories } = await fetchCategories();
            handleCategories(categories);
          } else {
            handleCategories(categories);
          }
        },
        createCategory: async (name) => {
          await createCategory(name);
          const { categories } = await fetchCategories();
          const newCategory = categories.reduce((latest, current) => {
            return Number(current.id) > Number(latest.id) ? current : latest;
          });
          const newName = newCategory.name.slice(2);
          const newEmoji = newCategory.name.slice(0, 2);

          const formattedCategory = {
            ...newCategory,
            name: newName,
            emoji: newEmoji,
            isSelected: false,
          };
          setUserInfo({
            ...userInfo,
            categories: [...userInfo.categories, formattedCategory],
          });
        },
        selectCategory: async (id) => {
          localStorage.setItem("selectedCategoryId", id);
          if (id === "favorites") {
            const nextCategories = userInfo.categories.map((c) => {
              return { ...c, isSelected: false };
            });
            const nextFavorites = { ...userInfo.favorites, isSelected: true };
            setUserInfo({
              ...userInfo,
              categories: nextCategories,
              favorites: nextFavorites,
              savedShows: userInfo.favorites.favoriteEpisodeIds,
              toShow: nextFavorites,
            });
          } else {
            const nextCategories = userInfo.categories.map((c) => {
              if (c.id === id) {
                return { ...c, isSelected: true };
              } else return { ...c, isSelected: false };
            });
            const nextFavorites = { ...userInfo.favorites, isSelected: false };
            const nextToshow = nextCategories.find(
              (c) => c.isSelected === true
            );
            const nextsavedShows = await getShows(nextToshow.savedShows);
            setUserInfo({
              ...userInfo,
              categories: nextCategories,
              favorites: nextFavorites,
              toShow: nextToshow,
              savedShows: nextsavedShows,
            });
          }
        },
        editCategory: async (id, newTitle, emoji) => {
          const updateName = emoji + newTitle;
          await updateCategoryName(id, updateName);
          const nextCategories = userInfo.categories.map((c) =>
            c.id === id ? { ...c, name: newTitle, emoji } : c
          );

          setUserInfo({ ...userInfo, categories: nextCategories });
        },
        deleteCategory: async (id) => {
          await deleteCategory(id);
          const nextCategories = userInfo.categories.filter((c) => c.id !== id);
          setUserInfo({
            ...userInfo,
            categories: nextCategories,
            toShow: nextCategories[0] || {},
          });
          localStorage.setItem(
            "selectedCategoryId",
            nextCategories[0].id || "favorites"
          );
        },
        addShow: async (categoryId, showId) => {
          await addShow(categoryId, showId);
          const nextCategories = userInfo.categories.map((c) =>
            c.id === categoryId
              ? { ...c, savedShows: [...c.savedShows, showId] }
              : c
          );
          const nextToshow = [...userInfo.toShow.savedShows, { id: showId }];
          const nextsavedShows = await getShows(nextToshow);
          setUserInfo({
            ...userInfo,
            categories: nextCategories,
            savedShows: nextsavedShows,
          });
        },
        removeShow: async (categoryId, showId) => {
          await removeShow(categoryId, showId);
          const nextCategories = userInfo.categories.map((c) => {
            if (c.id === categoryId) {
              return {
                ...c,
                savedShows: c.savedShows.filter((show) => show.id !== showId),
              };
            } else {
              return c;
            }
          });
          const nextToshow = userInfo.savedShows.filter(
            (show) => show.id !== showId
          );
          const nextsavedShows = await getShows(nextToshow);
          setUserInfo({
            ...userInfo,
            categories: nextCategories,
            savedShows: nextsavedShows,
          });
        },
        getShowEpisodes: async (showId) => {
          return await getShowEpisodes(showId);
        },
        handleFavorite: async (episodeId) => {
          const { favoriteEpisodeIds } = userInfo.favorites;
          const isExist = favoriteEpisodeIds.some(
            (favorite) => favorite.id === episodeId
          );
          if (isExist) {
            await removeFromFavorite(episodeId);
          } else {
            await saveToFavorite(episodeId);
          }
          const data = await fetchUserInfo();
          const nextFavorites = data.favoriteEpisodeIds;
          setUserInfo({
            ...userInfo,
            favorites: {
              ...userInfo.favorites,
              favoriteEpisodeIds: nextFavorites,
            },
          });
        },
        getEpisodes: async (episodeIds) => {
          return await getEpisodes(episodeIds);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
