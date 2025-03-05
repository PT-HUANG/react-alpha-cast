import logo from "../assets/images/logo.png";
import { Category, Favorites } from "../components";
import AddCategory from "./AddCategory";
import styled from "styled-components";
import { useNavbar } from "../context/NavbarContext";

const StyleToggleButton = styled.i`
  position: absolute;
  top: 3%;
  right: 10%;
  font-size: 1.5rem;
  color: #9d9b9b;
  &:hover {
    color: #000;
  }
  @media screen and (min-width: 768px) {
    display: none !important;
  }
`;

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

function Navbar({ userInfo }) {
  const { categories } = userInfo;
  const { isNavbarActive, handleToggleNavbar } = useNavbar();

  return (
    <div className={`navbar_container ${isNavbarActive && "navbar--active"}`}>
      <StyleToggleButton
        className="fa-solid fa-angles-left"
        onClick={handleToggleNavbar}
      ></StyleToggleButton>
      <img src={logo} className="navbar_logo" alt="logo" />
      <hr className="navbar_hr" />
      <ScrollableArea>
        {categories
          ? categories.map((data) => {
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
