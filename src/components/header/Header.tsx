import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.scss";
import logo from "../../assets/img/header/logo.svg";
import location from "../../assets/img/header/location.svg";
import cart from "../../assets/img/header/cart.svg";
import AuthModal from "../modals/AuthModal";
import Avatar from "./Avatar";
import { actions, useGlobal } from "../../store";
import { getProfile } from "../../services/account";
import { Badge } from "@mui/material";

const Header = () => {
  const pageIsActive = (isActive: boolean) =>
    isActive
      ? `${styles.menuItem} ${styles.menuItem__active}`
      : styles.menuItem;
  const favouriteIsActive = (isActive: boolean) =>
    isActive
      ? `${styles.userInfo__name} ${styles.userInfo__active}`
      : styles.userInfo__name;
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [globalState] = useGlobal();

  const handleOpen = () => setOpenLogin(true);

  useEffect(() => {
    if (globalState.token) {
      getProfile()
        .then((res) => {
          actions.setUsername(res.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [globalState.token]);

  return (
    <header className={styles.container}>
      <div className={styles.top}>
        <div className={styles.top__left}>
          <Link to="#">Магазины</Link>
          <Link to="#">Акции</Link>
          <Link to="#">Доставка и оплата</Link>
        </div>
        <div className={styles.top__logo}>
          <Link to="/">
            <img src={logo} alt="Логотип" />
          </Link>
        </div>
        <div className={styles.top__right}>
          <div className={styles.geolocation}>
            <img src={location} alt="Местоположение" />
            <span>Москва, ул.Науки 25</span>
          </div>
          <div className={styles.userInfo}>
            {globalState.token ? (
              <NavLink
                to="/favourite"
                className={({ isActive }) => favouriteIsActive(isActive)}
              >
                <Avatar />
                <span>{globalState.username}</span>
              </NavLink>
            ) : (
              <div className={styles.userInfo__name} onClick={handleOpen}>
                <Avatar />
                <span>Войти</span>
              </div>
            )}

            <div className={styles.userInfo__cart}>
              <Link to="/cart">
                <Badge
                  badgeContent={globalState.cartCounts}
                  color="primary"
                  sx={{
                    ".MuiBadge-badge": { transform: "translate(50%, 50%)" },
                  }}
                >
                  <img src={cart} alt="Корзина" />
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <NavLink className={({ isActive }) => pageIsActive(isActive)} to="/">
          Квадроциклы
        </NavLink>
        <NavLink className={({ isActive }) => pageIsActive(isActive)} to="/">
          Катера
        </NavLink>
        <NavLink
          className={({ isActive }) => pageIsActive(isActive)}
          to="/jet-skis"
        >
          Гидроциклы
        </NavLink>
        <NavLink className={({ isActive }) => pageIsActive(isActive)} to="/">
          Лодки
        </NavLink>
        <NavLink className={({ isActive }) => pageIsActive(isActive)} to="/">
          Вездеходы
        </NavLink>
        <NavLink className={({ isActive }) => pageIsActive(isActive)} to="/">
          Снегоходы
        </NavLink>
        <NavLink className={({ isActive }) => pageIsActive(isActive)} to="/">
          Двигатели
        </NavLink>
        <NavLink className={({ isActive }) => pageIsActive(isActive)} to="/">
          Запчасти
        </NavLink>
      </div>
      <AuthModal
        title="Вход"
        titleAnother="Регистрация"
        buttonText="Войти"
        type="login"
        open={openLogin}
        setOpen={setOpenLogin}
        setOpenAnother={setOpenRegister}
      />
      <AuthModal
        title="Регистрация"
        titleAnother="Вход"
        buttonText="Регистрация"
        type="register"
        open={openRegister}
        setOpen={setOpenRegister}
        setOpenAnother={setOpenLogin}
      />
    </header>
  );
};

export default Header;
