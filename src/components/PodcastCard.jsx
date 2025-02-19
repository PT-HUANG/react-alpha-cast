import styled from "styled-components";

const StyledContainer = styled.div``;

function PodcastCard({ info }) {
  const { images, name, publisher } = info;
  const imagesToShow = images[1];
  const { height, url, width } = imagesToShow;
  return (
    <StyledContainer>
      <img src={url} width={width} height={height} alt="" />
      <div>{name}</div>
      <div>{publisher}</div>
    </StyledContainer>
  );
}

export default PodcastCard;
