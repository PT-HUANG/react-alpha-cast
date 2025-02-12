import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Main } from "../components";
import { isTokenValid } from "../api/Spotify";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function handleHomePage() {
      if (!isAuthenticated) {
        navigate("/login");
      }
      isTokenValid();
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
