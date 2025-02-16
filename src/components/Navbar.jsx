import logo from "../assets/images/logo.png";
import { Category, Favorites } from "../components";
import AddCategory from "./AddCategory";
import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";

function Navbar() {
  const { userInfo, getCategories } = useUser();

  useEffect(() => {
    async function handleNavbar() {
      await getCategories();
    }
    handleNavbar();
  }, []);

  return (
    <div className="navbar_container">
      <img src={logo} className="navbar_logo" alt="logo" />
      <hr className="navbar_hr" />
      {userInfo.categories
        ? userInfo.categories.map((data) => {
            return (
              <Category
                key={data.id}
                id={data.id}
                name={data.name}
                emoji={data.emoji}
                isSelected={data.isSelected}
              />
            );
          })
        : ""}
      <Favorites />
      <AddCategory />
    </div>
  );
}

export default Navbar;
