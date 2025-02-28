import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Main } from "../components";
import { isTokenValid } from "../api/Spotify";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../Context/UserContext";

export default function Home() {
  const navigate = useNavigate();
  const { getProfile } = useAuth();
  const { userInfo, getCategories } = useUser();

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

  return (
    <div className="home_container">
      <Navbar className="navbar" userInfo={userInfo} />
      <Main className="main" userInfo={userInfo} />
    </div>
  );
}
