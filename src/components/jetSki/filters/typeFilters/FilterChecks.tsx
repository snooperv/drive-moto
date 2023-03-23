import React from "react";
import styles from "./filters.module.scss";
import filterArrow from "../../../../assets/img/main/filterArrow.svg";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const FilterChecks = (props: {
  title: string;
  checks: { text: string; name: string }[];
  isInput?: boolean;
  isMore?: boolean;
}) => {
  const checkboxStyle = {
    ".MuiTypography-root": { fontFamily: "inherit", fontSize: "14px" },
    ".MuiFormControlLabel-root": { marginRight: 0 },

    display: "grid",
    rowGap: "5px",
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={filterArrow} alt="Стрелка" />
        <span>{props.title}</span>
      </div>
      {props.isInput && (
        <input
          type="text"
          placeholder="Введите модель"
          name="model"
          className={styles.search}
        />
      )}
      <FormGroup
        sx={checkboxStyle}
        style={
          props.isInput
            ? { gridTemplateColumns: "1fr" }
            : { gridTemplateColumns: "1fr 1fr" }
        }
      >
        {props.checks.map((checkbox, index) => {
          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  name={checkbox.name}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                />
              }
              label={checkbox.text}
            />
          );
        })}
      </FormGroup>
      {props.isMore && <span className={styles.showMore}>Показать еще</span>}
    </div>
  );
};

FilterChecks.defaultProps = { isInput: false, isMore: false };

export default FilterChecks;
