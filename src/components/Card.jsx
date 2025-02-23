import styled from "styled-components";
import { Button } from "react-bootstrap";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 8px;
  margin: 0.5rem;
  padding-top: 1rem;
  box-shadow: 24px 8px 24px 0px #c7c7c73d;
  cursor: pointer;
  max-height: 280px;
  & img {
    max-width: 80%;
    border-radius: 8px;
    margin: 0 auto;
  }
`;

const StyledImage = styled.img`
  width: 80%;
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

function Card({ info }) {
  const { images, name, publisher, id } = info;
  const imagesToShow = images[1];
  const { height, url, width } = imagesToShow;
  return (
    <StyledContainer>
      <StyledImage src={url} width={width} height={height} />
      <StyledTitle>{name}</StyledTitle>
      <StyledSubtitle>{publisher}</StyledSubtitle>
      <Button className="card_button" variant="primary">
        更多
      </Button>
    </StyledContainer>
  );
}

export default Card;
