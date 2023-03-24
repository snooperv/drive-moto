import React, { useEffect } from "react";
import styles from "./filters.module.scss";
import filterArrow from "../../../../assets/img/main/filterArrow.svg";
import { Box, Slider } from "@mui/material";
import parsePrice from "../../../../helpers/parsePrice";
import { useSearchParams } from "react-router-dom";
import {
  controlQueries,
  removeQueries,
} from "../../../../helpers/controlQueries";

const FilterSlider = (props: {
  title: string;
  price: { minPrice: number; maxPrice: number };
  isReset: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = React.useState<number[]>([
    Number(searchParams.get("MinPrice")) || props.price.minPrice,
    Number(searchParams.get("MaxPrice")) || props.price.maxPrice,
  ]);

  useEffect(() => {
    if (props.isReset) {
      setValue([props.price.minPrice, props.price.maxPrice]);
    }
  }, [props.isReset, props.price.maxPrice, props.price.minPrice]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = () => {
    const prices = ["MinPrice", "MaxPrice"];
    let query = removeQueries({
      searchParams,
      excludeParams: prices,
    });
    if (value[0] !== props.price.minPrice)
      query = controlQueries(query, prices[0], String(value[0]));
    if (value[1] !== props.price.maxPrice)
      query = controlQueries(query, prices[1], String(value[1]));
    query = controlQueries(query);
    setSearchParams(query);
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

  const changePriceInput = (
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
    inputPrice.onkeyup = (e) => {
      if (e.code === "Enter") inputPrice.blur();
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
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="auto"
          min={props.price.minPrice}
          max={props.price.maxPrice}
          sx={sliderStyles}
        />
      </Box>

      <div className={styles.prices}>
        <div className={styles.prices__min}>
          от{" "}
          <span onClick={(e) => changePriceInput(e, "min")}>
            {parsePrice(value[0])}
          </span>
        </div>
        <div className={styles.prices__max}>
          до{" "}
          <span onClick={(e) => changePriceInput(e, "max")}>
            {parsePrice(value[1])}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterSlider;
