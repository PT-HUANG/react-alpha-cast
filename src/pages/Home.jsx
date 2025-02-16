import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Main } from "../components";
import { isTokenValid } from "../api/Spotify";
import { useAuth } from "../context/AuthContext";
// import { useUser } from "../Context/UserContext";

export default function Home() {
  const navigate = useNavigate();
  const { currentMember, getProfile } = useAuth();
  // const { userInfo, getCategories } = useUser();

  useEffect(() => {
    async function handleHomePage() {
      const result = await isTokenValid();
      if (!result) {
        navigate("/login");
      }
      await getProfile();
    }
    handleHomePage();
  }, [navigate]);

  return (
    <div className="home_container">
      <Navbar className="navbar" />
      <Main className="main" />
    </div>
  );
}
