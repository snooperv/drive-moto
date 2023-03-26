import React, { useEffect, useState } from "react";
import styles from "./oftenBuy.module.scss";
import Carousel from "react-material-ui-carousel";
import { oftenBuyList } from "../../constants/oftenBuyList";
import Product from "../cards/product/Product";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const OftenBuy = () => {
  const [sliderItems, setSliderItems] = useState(4);
  const items: Array<any> = [];

  const resizeHandler = (e: UIEvent) => {
    const page = e.target as Window;
    if (page.innerWidth < 1110) {
      setSliderItems(3);
    } else {
      setSliderItems(4);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  for (let i = 0; i < oftenBuyList.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <div className={styles.sliderGrid} key={i}>
          {oftenBuyList.slice(i, i + sliderItems).map((item, index) => {
            return <Product product={item} isSale={true} key={index} />;
          })}
        </div>
      );
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Часто покупают</h2>
      <Carousel {...settings} className={styles.slider}>
        {items}
      </Carousel>
    </div>
  );
};

const settings = {
  autoPlay: false,
  indicators: false,
  navButtonsAlwaysVisible: true,
  navButtonsAlwaysInvisible: false,
  cycleNavigation: true,
  fullHeightHover: true,
  swipe: true,
  height: "400px",
  animation: "fade" as "fade",
  NextIcon: <ArrowForwardIosIcon />,
  PrevIcon: <ArrowBackIosIcon />,
  navButtonsProps: {
    className: styles.navButtons,
  },
};

export default OftenBuy;
