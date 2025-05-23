import { useState, useContext, createContext } from "react";
import { getUserInfo, getNewToken } from "../api/AC";
import { getUserData, logoutClick } from "../api/spotify";

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
  const [currentMember, setCurrentMember] = useState({});

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember,
        getProfile: async () => {
          const { display_name, images } = await getUserData();
          const { id, favoriteEpisodeIds } = await getUserInfo();
          setCurrentMember({ display_name, images, id, favoriteEpisodeIds });
        },
        login: async () => {
          const { token } = await getNewToken();
          setIsAuthenticated(true);
          localStorage.setItem("apiToken", token);
        },
        logout: async () => {
          await logoutClick();
          localStorage.removeItem("apiToken");
          setCurrentMember(null);
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
