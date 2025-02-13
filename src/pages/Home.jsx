import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Main } from "../components";
import { isTokenValid } from "../api/Spotify";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { getProfile } = useAuth();

  useEffect(() => {
    async function handleHomePage() {
      const result = await isTokenValid();
      if (!result) {
        navigate("/login");
      }
      getProfile();
    }
    handleHomePage();
  }, []);

  return (
    <div className="home_container">
      <Navbar className="navbar" />
      <Main className="main" />
    </div>
  );
}
