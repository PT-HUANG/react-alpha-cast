import axios from "axios";
const baseURL = "https://spotify-backend.alphacamp.io/"

export const getUserInfo = async () => {};

export const getNewToken = async () => {
  const spotifyToken = localStorage.getItem("access_token")
  try {
    const {data} = await axios.post(`${baseURL}api/users`, {
      spotifyToken
    })
    return data
  } catch (error) {
    console.error('[Login failed]: ', error)
  }
};

export const saveToFavorite = async () => {};
export const removeFromFavorite = async () => {};
export const getCategories = async () => {};
export const createCategory = async () => {};
export const updateCategoryName = async () => {};
export const deleteCategory = async () => {};
export const addShow = async () => {};
export const removeShow = async () => {};