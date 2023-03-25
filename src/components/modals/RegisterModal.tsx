import React from "react";
import { Modal } from "@mui/material";
import styles from "./authModal.module.scss";
import logo from "../../assets/img/header/logo.svg";
import ButtonApply from "../buttons/ButtonApply";

const RegisterModal = (props: {
  openRegister: boolean;
  setOpenLogin: (open: boolean) => void;
  setOpenRegister: (open: boolean) => void;
}) => {
  const handleClose = () => props.setOpenRegister(false);
  const openRegistration = () => {
    props.setOpenRegister(false);
    props.setOpenLogin(true);
  };

  return (
    <Modal
      open={props.openRegister}
      onClose={handleClose}
      disableAutoFocus={true}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="Логотип" />
        </div>
        <form className={styles.entry}>
          <div className={styles.title}>Регистрация</div>
          <input
            type="text"
            placeholder="ФИО"
            name="name"
            className={styles.textField}
          />
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
          <ButtonApply text="Регистрация" style={{ padding: "16px 43px" }} />
          <span className={styles.alternative} onClick={openRegistration}>
            Вход
          </span>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;
