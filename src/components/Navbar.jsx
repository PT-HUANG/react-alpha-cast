import logo from "../assets/images/logo.png";
import { Category, Favorites } from "../components";
import AddCategory from "./AddCategory";
import { useEffect } from "react";
import { useUser } from "../Context/UserContext";
import styled from "styled-components";

const ScrollableArea = styled.div`
  height: 78%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f6f7f8;
  }
`;

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
      <ScrollableArea>
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
      </ScrollableArea>
    </div>
  );
}

export default Navbar;
