import axios from "axios";
const baseURL = "https://spotify-backend.alphacamp.io";

export const getUserInfo = async () => {
  const spotifyToken = localStorage.getItem("apiToken");
  try {
    const { data } = await axios.get(`${baseURL}/api/me`, {
      headers: {
        Authorization: "Bearer " + spotifyToken,
      },
    });
    return data;
  } catch (error) {
    console.error("[GetUserInfo failed]: ", error);
  }
};

export const getNewToken = async () => {
  const spotifyToken = localStorage.getItem("access_token");
  try {
    const { data } = await axios.post(`${baseURL}/api/users`, {
      spotifyToken,
    });
    return data;
  } catch (error) {
    console.error("[Login failed]: ", error);
  }
};

export const saveToFavorite = async () => {};
export const removeFromFavorite = async () => {};

export const getCategories = async () => {
  const apiToken = localStorage.getItem("apiToken");
  try {
    const { data } = await axios.get(`${baseURL}/api/categories`, {
      headers: {
        Authorization: "Bearer " + apiToken,
      },
    });
    return data;
  } catch (error) {
    console.error("[Get categories failed]: ", error);
  }
};
export const createCategory = async (name) => {
  const apiToken = localStorage.getItem("apiToken");
  try {
    const { data } = await axios.post(
      `${baseURL}/api/categories`,
      { name: `🔰${name}` },
      {
        headers: {
          Authorization: "Bearer " + apiToken,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("[Create category failed]: ", error);
  }
};
export const updateCategoryName = async (id, name) => {
  const apiToken = localStorage.getItem("apiToken");
  try {
    const { data } = await axios.put(
      `${baseURL}/api/categories/${id}`,
      { name: name },
      {
        headers: {
          Authorization: "Bearer " + apiToken,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("[Update category name failed]: ", error);
  }
};
export const deleteCategory = async (id) => {
  const apiToken = localStorage.getItem("apiToken");
  try {
    const { data } = await axios.delete(`${baseURL}/api/categories/${id}`, {
      headers: {
        Authorization: "Bearer " + apiToken,
      },
    });
    return data;
  } catch (error) {
    console.error("[Delete category failed]: ", error);
  }
};
export const addShow = async () => {};
export const removeShow = async () => {};
