import Slider from "react-slick";
import slide_1 from "../assets/images/slide_1.png";
import slide_2 from "../assets/images/slide_2.png";
import slide_3 from "../assets/images/slide_3.png";
import styled from "styled-components";

const StyledCard = styled.div`
  background-color: ${(props) => props.$bgColor};
  color: #fff;
`;

function FeatureSlide() {
  const PrevArrow = ({ onClick }) => (
    <button className="custom-prev" onClick={onClick}>
      <i className="fa-solid fa-angle-left"></i>
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button className="custom-next" onClick={onClick}>
      <i className="fa-solid fa-angle-right"></i>
    </button>
  );

  const settings = {
    dots: true, // 啟用分頁點
    customPaging: () => (
      <div
        className="paginator"
        style={{
          position: "absolute",
          transform: "translateX(-50%)",
          top: "0%",
          width: "32px",
          height: "4px",
          borderRadius: "8px",
        }}
      ></div>
    ),
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <Slide
          bgColor="#23262f"
          img={slide_1}
          p1="鼓舞人心的故事"
          p2="從非凡的人生故事和成功經歷中獲得靈感"
        />
        <Slide
          bgColor="#2D3831"
          img={slide_2}
          p1="輕鬆分類與管理"
          p2="一目了然的分類，讓收藏的 Podcast 保持整潔"
        />
        <Slide
          bgColor="#063540"
          img={slide_3}
          p1="Spotify 快速同步"
          p2="透過 Spotify 登入，即刻同步您的收藏，隨時隨地收聽"
        />
      </Slider>
    </div>
  );
}

function Slide({ bgColor, img, p1, p2 }) {
  return (
    <StyledCard className="card" $bgColor={bgColor}>
      <div className="card_container">
        <img src={img} className="card_img" alt="slide" />
        <p className="card_p1">{p1}</p>
        <p className="card_p2">{p2}</p>
      </div>
    </StyledCard>
  );
}

export default FeatureSlide;
