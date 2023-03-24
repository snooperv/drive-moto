import React, { useEffect } from "react";
import styles from "./filters.module.scss";
import filterArrow from "../../../../assets/img/main/filterArrow.svg";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  controlQueries,
  removeQueries,
} from "../../../../helpers/controlQueries";

const FilterChecks = (props: {
  title: string;
  checks: { text: string; name: string; value: string }[];
  isInput?: boolean;
  isMore?: boolean;
  disabledList?: string[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let newQuery: [string, string][] | URLSearchParams = searchParams;
    for (let entry of searchParams.entries()) {
      const current = props.checks.filter(
        (check) => entry[0] === check.name && entry[1] === check.value
      )[0];
      if (current && props.disabledList?.includes(current.value)) {
        newQuery = removeQueries({
          searchParams,
          name: current.name,
          value: current.value,
        });
      }
    }
    if (Array.isArray(newQuery)) {
      setSearchParams(newQuery);
    }
  }, [props, searchParams, setSearchParams]);

  const isChecked = (name: string, value: string) => {
    let flag = false;
    if (!props.disabledList?.includes(value)) {
      for (const entry of searchParams.entries()) {
        const [param, valueQuery] = entry;
        if (param === name && valueQuery === value) flag = true;
      }
    }
    return flag;
  };

  const filter = (
    name: string,
    value: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = event.target as HTMLInputElement;
    let query = [...searchParams];
    if (target.checked) {
      query = controlQueries(query);
      query.push([name, value]);
    } else query = removeQueries({ searchParams, name, value });

    setSearchParams(query);
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
                  value={checkbox.value}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                  checked={isChecked(checkbox.name, checkbox.value)}
                  onClick={(event) =>
                    filter(checkbox.name, checkbox.value, event)
                  }
                  disabled={
                    props.disabledList?.includes(checkbox.value) || false
                  }
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

const checkboxStyle = {
  ".MuiTypography-root": { fontFamily: "inherit", fontSize: "14px" },
  ".MuiFormControlLabel-root": { marginRight: 0 },

  display: "grid",
  rowGap: "5px",
};

FilterChecks.defaultProps = { isInput: false, isMore: false };

export default FilterChecks;
