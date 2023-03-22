import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import styles from "./filters.module.scss";
import { styled } from "@mui/material/styles";
import NotFilter from "./typeFilters/NotFilter";
import FilterChecks from "./typeFilters/FilterChecks";
import FilterSlider from "./typeFilters/FilterSlider";
import FilterButtons from "./typeFilters/FilterButtons";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <Box sx={{ width: "100%" }}>
        <AntTabs value={value} onChange={handleChange} aria-label="basic tabs">
          <AntTab label="Параметры" {...a11yProps(0)} />
          <AntTab label="По марке" {...a11yProps(1)} />
        </AntTabs>

        <TabPanel value={value} index={0}>
          <form className={styles.filters}>
            <FilterChecks
              title="Наличие"
              checks={[
                { text: "В наличие", name: "inStock" },
                { text: "Под заказ", name: "inOrder" },
              ]}
            />
            <FilterSlider
              title="Цена"
              price={{ minPrice: 100000, maxPrice: 500000 }}
            />
            <FilterChecks
              title="Бренд"
              checks={[
                { text: "BRP", name: "brp" },
                { text: "Spark 2", name: "spark2" },
                { text: "Spark 3", name: "spark3" },
              ]}
              isMore
            />
            <FilterChecks
              title="Модель"
              checks={[
                { text: "Sea-doo Spark 2", name: "seaDooSpark2" },
                { text: "SeaDoo Spark 90", name: "seaDooSpark90" },
                { text: "SeaDoo GTI 155", name: "seaDooGTI155" },
                { text: "SeaDoo GTR 230", name: "seaDooGTI230" },
              ]}
              isInput
              isMore
            />
            <FilterButtons title="Акции" />
            <FilterChecks
              title="Страны"
              checks={[
                { text: "Россия", name: "russia" },
                { text: "Германия", name: "germany" },
                { text: "Китай", name: "china" },
                { text: "CША", name: "usa" },
              ]}
              isMore
            />
            <button type="submit" className={styles.apply}>
              Выбрать
            </button>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NotFilter />
        </TabPanel>
      </Box>
    </div>
  );
};

export default Filters;
