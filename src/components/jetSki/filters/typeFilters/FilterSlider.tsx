import React from "react";
import styles from "./filters.module.scss";
import filterArrow from "../../../../assets/img/main/filterArrow.svg";
import { Box, Slider } from "@mui/material";
import parsePrice from "../../../../helpers/parsePrice";

const FilterSlider = (props: {
  title: string;
  price: { minPrice: number; maxPrice: number };
}) => {
  const [value, setValue] = React.useState<number[]>([
    props.price.minPrice,
    props.price.maxPrice,
  ]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const sliderStyles = {
    "&.MuiSlider-root": {
      color: "#E0E0E0",
      height: "3px",
    },
    ".MuiSlider-thumb": {
      backgroundColor: "#1C62CD",
      width: "10px",
      height: "10px",
    },
    ".MuiSlider-track": {
      backgroundColor: "#1C62CD",
    },
  };

  const changePrice = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    price: string
  ) => {
    let oldPrice = e.target as HTMLElement;
    let inputPrice = document.createElement("input");
    inputPrice.value = oldPrice.innerText.replace(/[^0-9.]/g, "");
    inputPrice.style.width = "60px";
    oldPrice.replaceWith(inputPrice);
    inputPrice.focus();
    inputPrice.oninput = () => {
      inputPrice.value = inputPrice.value.replace(/[^0-9.]/g, "");
    };
    inputPrice.onblur = () => {
      const newPrice = Number(inputPrice.value);
      oldPrice.innerText = parsePrice(newPrice);
      inputPrice.replaceWith(oldPrice);
      if (price === "min") setValue([newPrice, value[1]]);
      else if (price === "max") setValue([value[0], newPrice]);
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={filterArrow} alt="Стрелка" />
        <span>{props.title}</span>
      </div>

      <Box sx={{ width: "100%" }}>
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={props.price.minPrice}
          max={props.price.maxPrice}
          sx={sliderStyles}
        />
      </Box>

      <div className={styles.prices}>
        <div className={styles.prices__min}>
          от{" "}
          <span onClick={(e) => changePrice(e, "min")}>
            {parsePrice(value[0])}
          </span>
        </div>
        <div className={styles.prices__max}>
          до{" "}
          <span onClick={(e) => changePrice(e, "max")}>
            {parsePrice(value[1])}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterSlider;
