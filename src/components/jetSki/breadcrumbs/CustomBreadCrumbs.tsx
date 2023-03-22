import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CustomBreadCrumbs = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Главная
    </Link>,
    <Typography key="3" color="text.primary">
      Гидроциклы
    </Typography>,
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      style={{ margin: "44px 0" }}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default CustomBreadCrumbs;
