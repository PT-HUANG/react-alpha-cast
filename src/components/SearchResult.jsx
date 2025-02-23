import styled from "styled-components";

const StyledContainer = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  margin: 1rem;
  padding-top: 1rem;
  box-shadow: 24px 8px 24px 0px #c7c7c73d;
  cursor: pointer;
  max-height: 250px;
  border: ${(props) =>
    props.$isSelected ? "2px solid #ff7f50" : "2px solid transparent"};
  & img {
    max-width: 80%;
    border-radius: 8px;
    margin: 0 auto;
  }
`;

const StyledTitle = styled.div`
  margin: 0.5rem 1rem;
  margin-bottom: 0;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledSubtitle = styled.div`
  margin: 0.5rem 1rem;
  margin-top: 0;
  color: #93989a;
  font-size: 0.75rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
`;

function Result({ info, $isSelected, onSelect }) {
  const { images, name, publisher, id } = info;
  const imagesToShow = images[1];
  const { height, url, width } = imagesToShow;
  return (
    <StyledContainer
      $isSelected={$isSelected}
      onClick={() => {
        onSelect(id);
      }}
    >
      <img src={url} width={width} height={height} alt="" />
      <StyledTitle>{name}</StyledTitle>
      <StyledSubtitle>{publisher}</StyledSubtitle>
    </StyledContainer>
  );
}

export default Result;
