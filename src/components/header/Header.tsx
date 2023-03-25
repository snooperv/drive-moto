import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.scss";
import logo from "../../assets/img/header/logo.svg";
import location from "../../assets/img/header/location.svg";
import avatar from "../../assets/img/header/profile.svg";
import cart from "../../assets/img/header/cart.svg";
import AuthModal from "../modals/AuthModal";

const Header = () => {
  const pageIsActive = (isActive: boolean) =>
    isActive
      ? `${styles.menuItem} ${styles.menuItem__active}`
      : styles.menuItem;
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const handleOpen = () => setOpenLogin(true);

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
            <div className={styles.userInfo__name} onClick={handleOpen}>
              <img src={avatar} alt="Аватар" />
              <span>Войти</span>
            </div>
            <div className={styles.userInfo__cart}>
              <img src={cart} alt="Корзина" />
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
