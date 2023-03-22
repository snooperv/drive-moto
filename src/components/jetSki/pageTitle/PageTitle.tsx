import React from "react";
import styles from "./pageTitle.module.scss";
import { styled } from "@mui/material/styles";
import iconTable from "../../../assets/img/main/iconTable.svg";
import iconRow from "../../../assets/img/main/iconRow.svg";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const StyledSelect = styled(Select)(() => ({
  ".MuiSelect-select": {
    fontFamily: "inherit",
    padding: "8px 46px 8px 20px",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#2f3035",
    minHeight: "auto !important",
  },
}));

const PageTitle = () => {
  const [sort, setSort] = React.useState("1");

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setSort(event.target.value as string);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Гидроциклы</h1>
      <div className={styles.filters}>
        <div className={styles.filters__left}>
          <span>Полноприводные</span>
          <span>от 5000</span>
          <span>BRP</span>
          <span>еще</span>
        </div>
        <div className={styles.filters__right}>
          <Box sx={{ width: 178 }}>
            <FormControl fullWidth>
              <StyledSelect
                value={sort}
                label="sort"
                onChange={handleChange}
                input={<OutlinedInput />}
                className="sorting-select"
              >
                <MenuItem value={1}>По популярности</MenuItem>
                <MenuItem value={2}>По рейтингу</MenuItem>
                <MenuItem value={3}>По цене</MenuItem>
              </StyledSelect>
            </FormControl>
          </Box>
          <div className={styles.mapping}>
            <img src={iconTable} alt="Таблица" />
            <img src={iconRow} alt="Строки" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
