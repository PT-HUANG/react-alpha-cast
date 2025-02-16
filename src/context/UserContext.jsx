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
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider
      value={{
        userInfo,
        getCategories: async () => {
          const { categories } = await getCategories();
          const { favoriteEpisodeIds } = await getUserInfo();
          const savedEmojis =
            JSON.parse(localStorage.getItem("categoryEmojis")) || {};
          const nextCategories = categories.map((c) => ({
            ...c,
            emoji: savedEmojis[c.id] || "🔰", // 如果有存過 emoji，就用存的，否則用預設值
            isSelected: false,
          }));

          setUserInfo({
            categories: nextCategories,
            favorites: { favoriteEpisodeIds, isSelected: false },
          });
        },
        createCategory: async (name) => {
          await createCategory(name);
          const { categories } = await getCategories();
          const newCategory = categories.reduce((latest, current) => {
            return Number(current.id) > Number(latest.id) ? current : latest;
          });
          const formattedCategory = {
            ...newCategory,
            emoji: "🔰",
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
            });
          } else {
            const nextCategories = userInfo.categories.map((c) => {
              if (c.id === id) {
                return { ...c, isSelected: true };
              } else return { ...c, isSelected: false };
            });
            const nextFavorites = { ...userInfo.favorites, isSelected: false };
            setUserInfo({
              ...userInfo,
              categories: nextCategories,
              favorites: nextFavorites,
            });
          }
        },
        editCategory: async (id, newTitle, emoji) => {
          await updateCategoryName(id, newTitle);
          const savedEmojis =
            JSON.parse(localStorage.getItem("categoryEmojis")) || {};
          savedEmojis[id] = emoji;
          localStorage.setItem("categoryEmojis", JSON.stringify(savedEmojis));
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
