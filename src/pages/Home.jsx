import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Main } from "../components";
import { isTokenValid } from "../api/spotify";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../Context/UserContext";

export default function Home() {
  const navigate = useNavigate();
  const { getProfile } = useAuth();
  const { userInfo, getCategories } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function handleHomePage() {
      const isValid = await isTokenValid();
      if (!isValid) {
        navigate("/login");
      }
      await getProfile();
      await getCategories();
    }
    handleHomePage();
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
