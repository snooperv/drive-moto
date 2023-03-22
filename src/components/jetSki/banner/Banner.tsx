import React from "react";
import styles from "./banner.module.scss";
import banner from "../../../assets/img/main/banner.jpg";
import Carousel from "react-material-ui-carousel";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Banner = () => {
  const items = [
    {
      img: banner,
    },
    {
      img: banner,
    },
    {
      img: banner,
    },
    {
      img: banner,
    },
    {
      img: banner,
    },
    {
      img: banner,
    },
  ];

  const settings = {
    autoPlay: false,
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: true,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: true,
    height: "400px",
    animation: "slide" as "slide",
    indicatorContainerProps: {
      className: styles.indicatorContainer,
    },
    IndicatorIcon: <PanoramaFishEyeIcon />,
    indicatorIconButtonProps: {
      className: styles.indicatorIcon,
    },
    activeIndicatorIconButtonProps: {
      className: styles.activeIndicatorIcon,
    },
    NextIcon: <ArrowForwardIosIcon />,
    PrevIcon: <ArrowBackIosIcon />,
    navButtonsProps: {
      className: styles.navButtons,
    },
  };

  return (
    <Carousel {...settings} className={styles.slider}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props: { item: { img: string } }) {
  return (
    <div className={styles.slide}>
      <img src={props.item.img} alt="Баннер" />
    </div>
  );
}

export default Banner;
