import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link, { LinkProps } from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation } from "react-router";
import { Link as RouterLink } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/jet-skis": "Гидроциклы",
  "/favourite": "Личный кабинет",
};

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => {
  return <Link {...props} component={RouterLink as any} />;
};

const CustomBreadCrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
      style={{ margin: "44px 0" }}
    >
      <LinkRouter underline="hover" color="inherit" to="/">
        Главная
      </LinkRouter>
      {pathNames.map((value, index) => {
        const last = index === pathNames.length - 1;
        const to = `/${pathNames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadCrumbs;
