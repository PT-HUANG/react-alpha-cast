import { useState, useContext, createContext } from "react";
import {
  getUserInfo,
  getCategories,
  createCategory,
  updateCategoryName,
  deleteCategory,
} from "../api/AC";

const defaultUserContext = {
  userInfo: null,
  getCategories: null,
  createCategory: null,
  selectCategory: null,
  editCategory: null,
  deleteCategory: null,
};

const UserContext = createContext(defaultUserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    categories: [],
    favorites: { name: "已收藏", favoriteEpisodeIds: [], isSelected: false },
    toShow: {},
  });

  return (
    <UserContext.Provider
      value={{
        userInfo,
        getCategories: async () => {
          const { categories } = await getCategories();
          const { favoriteEpisodeIds } = await getUserInfo();

          const defaultCategories = [
            "通勤清單",
            "學習清單",
            "睡前清單",
            "我的Podcast",
          ];

          const handleCategories = (categories) => {
            categories.sort((a, b) => {
              return Number(a.id) - Number(b.id);
            });

            setUserInfo({
              ...userInfo,
              categories: categories.map((c) => ({
                ...c,
                name: c.name.slice(2),
                emoji: c.name.slice(0, 2),
                isSelected: false,
              })),
              favorites: {
                name: "已收藏",
                favoriteEpisodeIds,
                isSelected: false,
              },
            });
          };

          if (categories.length === 0) {
            for (const category of defaultCategories) {
              await createCategory(category);
            }
            const { categories } = await getCategories();
            handleCategories(categories);
          } else {
            handleCategories(categories);
          }
        },
        createCategory: async (name) => {
          await createCategory(name);
          const { categories } = await getCategories();
          const newCategory = categories.reduce((latest, current) => {
            return Number(current.id) > Number(latest.id) ? current : latest;
          });
          const newName = newCategory.name.slice(2);
          const newEmoji = newCategory.name.slice(0, 1);

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
        selectCategory: (id) => {
          if (id === "favorites") {
            const nextCategories = userInfo.categories.map((c) => {
              return { ...c, isSelected: false };
            });
            const nextFavorites = { ...userInfo.favorites, isSelected: true };
            setUserInfo({
              ...userInfo,
              categories: nextCategories,
              favorites: nextFavorites,
              toShow: nextFavorites,
            });
          } else {
            const nextCategories = userInfo.categories.map((c) => {
              if (c.id === id) {
                return { ...c, isSelected: true };
              } else return { ...c, isSelected: false };
            });
            const nextFavorites = { ...userInfo.favorites, isSelected: false };
            const showInfo = nextCategories.filter(
              (c) => c.isSelected === true
            );
            setUserInfo({
              ...userInfo,
              categories: nextCategories,
              favorites: nextFavorites,
              toShow: showInfo,
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
          setUserInfo({ ...userInfo, categories: nextCategories });
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
