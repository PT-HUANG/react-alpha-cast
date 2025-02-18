import styled from "styled-components";
import { useUser } from "../Context/UserContext";

const StyledCategoryContainer = styled.div`
  background-color: ${(props) => (props.$isSelected ? "#111111" : "#F6F7F8")};
`;

const StyledContent = styled.span`
  color: ${(props) => (props.$isSelected ? "#FEFEFE" : "#718096")};
`;

function Favorites() {
  const { selectCategory, userInfo } = useUser();

  return (
    <StyledCategoryContainer
      className="category"
      $isSelected={userInfo.favorites.isSelected}
      onClick={() => {
        selectCategory("favorites");
      }}
    >
      <div className="category_title">
        <span className="category_emoji">❤️</span>
        <StyledContent
          className="category_content"
          $isSelected={userInfo.favorites.isSelected}
        >
          已收藏
        </StyledContent>
      </div>
    </StyledCategoryContainer>
  );
}

export default Favorites;
