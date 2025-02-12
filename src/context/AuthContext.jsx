import { useState, useContext, createContext } from "react";
import { getNewToken } from "../api/AC";
import { getProfile, logoutClick } from "../api/Spotify";

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  getProfile: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          display_name: payload.display_name,
          images: payload.images,
          id: payload.id,
          favoriteEpisodeIds: payload.favoriteEpisodeIds,
        },
        getProfile: async () => {
          const { display_name, images } = await getProfile();
          setPayload({ display_name, images });
        },
        login: async () => {
          const { id, favoriteEpisodeIds, token } = await getNewToken();
          setPayload({ ...payload, id, favoriteEpisodeIds });
          setIsAuthenticated(true);
          localStorage.setItem("apiToken", token);
        },
        logout: async () => {
          await logoutClick();
          localStorage.removeItem("apiToken");
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
