import React from "react";
import styles from "./filters.module.scss";
import filterArrow from "../../../../assets/img/main/filterArrow.svg";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const FilterButtons = (props: { title: string }) => {
  const isChecked = () => {
    let listChecked = [];
    for (const entry of searchParams.entries()) {
      const [param, valueQuery] = entry;
      if (param === "Actions") listChecked.push(valueQuery);
    }
    return listChecked;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [alignment, setAlignment] = React.useState(isChecked);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    const button = event.target as HTMLButtonElement;
    let query = [...searchParams];
    if (button.ariaPressed === "false") query.push(["Actions", button.value]);
    else {
      const newQuery = [];
      for (const entry of searchParams.entries()) {
        if (JSON.stringify(entry) !== JSON.stringify(["Actions", button.value]))
          newQuery.push(entry);
      }
      query = newQuery;
    }
    setSearchParams(query);

    let copy = Object.assign([], alignment);
    if (copy.includes(newAlignment)) {
      const index = copy.indexOf(newAlignment);
      delete copy[index];
    } else copy.push(newAlignment);
    setAlignment(copy);
  };

  const buttonsStyles = {
    gap: "10px",
    ".MuiButtonBase-root": {
      border: "none",
      borderRadius: "3px !important",
      background: "#F0F0F4",
      padding: "5px 15px",
      color: "#C4C4C4",
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "0.07em",
    },
    ".Mui-selected": {
      background: "#1C62CD !important",
      color: "#FFFFFF !important",
    },
    ".MuiButtonBase-root:hover": {
      background: "#2F3035",
      color: "#FFFFFF",
    },
    "@media  (max-width: 1200px)": {
      flexWrap: "wrap",
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={filterArrow} alt="Стрелка" />
        <span>{props.title}</span>
      </div>

      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={buttonsStyles}
      >
        <ToggleButton value="0">SALE</ToggleButton>
        <ToggleButton value="1">NEW</ToggleButton>
        <ToggleButton value="2">HIT</ToggleButton>
        <ToggleButton value="3">ДИЛЕР</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default FilterButtons;
