import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Main } from "../components";
import axios from "axios";

export default function Home() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let accessToken = localStorage.getItem("access_token");
    async function getProfile(accessToken) {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      console.log(data);
      setUserData(data);
    }

    getProfile(accessToken);
  }, [navigate]);

  return (
    <div className="home_container">
      <Navbar className="navbar" />
      <Main className="main" userData={userData} />
    </div>
  );
}
