import React from "react";
import styles from "./filters.module.scss";
import filterArrow from "../../../../assets/img/main/filterArrow.svg";
import { Box, Slider } from "@mui/material";

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
          от <span>{value[0]}</span>
        </div>
        <div className={styles.prices__max}>
          до <span>{value[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSlider;
