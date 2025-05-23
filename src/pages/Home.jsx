import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Main } from "../components";
import { isTokenValid, refreshTokenClick } from "../api/spotify";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { userInfo, getCategories } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const { getProfile } = useAuth();

  useEffect(() => {
    async function handleHomePage() {
      const isValid = await isTokenValid();
      if (!isValid) {
        navigate("/login");
      }
      await getCategories();
      await getProfile();
    }
    handleHomePage();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const expires = localStorage.getItem("expires");
      if (Date.now() > expires - 60000) {
        await refreshTokenClick();
        console.log("🙏Token刷新");
      }
    }, 60000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (userInfo.categories.length) {
      setIsLoading(false);
    }
  }, [userInfo.categories.length]);

  return (
    <div className="home_container">
      {isLoading && (
        <div className="loader_container">
          <div className="home_loader"></div>
        </div>
      )}
      <Navbar className="navbar" userInfo={userInfo} />
      <Main className="main" userInfo={userInfo} />
    </div>
  );
}
