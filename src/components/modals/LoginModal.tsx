import React from "react";
import { Modal } from "@mui/material";
import styles from "./authModal.module.scss";
import logo from "../../assets/img/header/logo.svg";
import ButtonApply from "../buttons/ButtonApply";

const LoginModal = (props: {
  openLogin: boolean;
  setOpenLogin: (open: boolean) => void;
  setOpenRegister: (open: boolean) => void;
}) => {
  const handleClose = () => props.setOpenLogin(false);
  const openRegistration = () => {
    props.setOpenLogin(false);
    props.setOpenRegister(true);
  };

  return (
    <Modal open={props.openLogin} onClose={handleClose} disableAutoFocus={true}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="Логотип" />
        </div>
        <form className={styles.entry}>
          <div className={styles.title}>Вход</div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className={styles.textField}
          />
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            className={styles.textField}
          />
          <ButtonApply text="Войти" style={{ padding: "16px 43px" }} />
          <span className={styles.alternative} onClick={openRegistration}>
            Регистрация
          </span>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
