import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./filters.module.scss";
import { styled } from "@mui/material/styles";
import NotFilter from "./typeFilters/NotFilter";
import { getFilters } from "../../../services/data";
import { filtersProps } from "./filtersProps";
import FiltersFirstTab from "./filtersFirstTab/FiltersFirstTab";

const AntTabs = styled(Tabs)({
  minHeight: "auto",
  gap: 42,
  ".MuiTabs-flexContainer": {
    gap: 42,

    "@media  (max-width: 1200px)": {
      gap: "7px",
    },
  },
  ".MuiTabs-indicator": {
    backgroundColor: "#1C62CD",
  },
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(() => ({
  fontFamily: "inherit",
  minHeight: "auto",
  fontSize: 16,
  color: "#C4C4C4",
  padding: "0 0 7px",
  "&:hover": {
    color: "#000",
    opacity: 1,
  },
  "&.Mui-selected": {
    fontWeight: 700,
    color: "#2F3035",
  },
}));

interface StyledTabProps {
  label: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className={styles.tabPanel}>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Filters = () => {
  const [value, setValue] = useState(0);
  const [filters, setFilters] = useState<filtersProps>({});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getFilters().then((res) => {
      setFilters(res);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Box sx={{ width: "100%" }}>
        <AntTabs value={value} onChange={handleChange} aria-label="basic tabs">
          <AntTab label="Параметры" {...a11yProps(0)} />
          <AntTab label="По марке" {...a11yProps(1)} />
        </AntTabs>

        <TabPanel value={value} index={0}>
          {Object.keys(filters).length !== 0 ? (
            <FiltersFirstTab {...filters} />
          ) : (
            <div className={styles.filters__empty}>
              К сожалению, список фильтров пуст
            </div>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={styles.filters__empty}>
            <NotFilter />
          </div>
        </TabPanel>
      </Box>
    </div>
  );
};

export default Filters;
