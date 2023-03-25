import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import styles from "./authModal.module.scss";
import logo from "../../assets/img/header/logo.svg";
import ButtonApply from "../buttons/ButtonApply";
import {
  onEmailChange,
  onNameChange,
  onPasswordChange,
  validateEmail,
  validateName,
  validatePassword,
} from "../../helpers/validateForm";

const AuthModal = (props: {
  title: string;
  titleAnother: string;
  buttonText: string;
  type: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenAnother: (open: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameValid, setNameValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorText, setSubmitErrorText] = useState("");

  useEffect(() => {
    if (
      props.type === "register" &&
      nameValid === "true" &&
      emailValid === "true" &&
      passwordValid === "true"
    ) {
      setSubmitError(true);
      setSubmitErrorText("Произошла ошибка при отправке данных");
    }
  }, [email, emailValid, name, nameValid, password, passwordValid, props.type]);

  const handleClose = () => {
    clearForm();
    props.setOpen(false);
  };

  const openAnother = () => {
    clearForm();
    props.setOpenAnother(true);
    props.setOpen(false);
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    clearErrors();
  };

  const clearErrors = () => {
    setNameValid("");
    setEmailValid("");
    setPasswordValid("");
    setSubmitError(false);
    setSubmitErrorText("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(email, setEmailValid);
    validatePassword(password, setPasswordValid);
    if (props.type === "register") {
      validateName(name, setNameValid);
    }
  };

  return (
    <Modal open={props.open} onClose={handleClose} disableAutoFocus={true}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="Логотип" />
        </div>
        <form className={styles.entry} onSubmit={handleSubmit}>
          <div className={styles.title}>{props.title}</div>
          {props.type === "register" && (
            <input
              type="text"
              placeholder="ФИО"
              name="name"
              className={styles.textField}
              value={name}
              onChange={(e) => onNameChange(e, setName, clearErrors)}
            />
          )}
          {nameValid === "false" && (
            <span className={styles.error}>
              Заполните в виде: Фамилия Имя Отчество
            </span>
          )}

          <input
            type="email"
            placeholder="Email"
            name="email"
            className={styles.textField}
            value={email}
            onChange={(e) => onEmailChange(e, setEmail, clearErrors)}
          />
          {emailValid === "false" && (
            <span className={styles.error}>Заполните корректный email</span>
          )}

          <input
            type="password"
            placeholder="Пароль"
            name="password"
            className={styles.textField}
            value={password}
            onChange={(e) => onPasswordChange(e, setPassword, clearErrors)}
          />
          {passwordValid === "false" && (
            <span className={styles.error}>
              Пароль должен быть больше 6 символов
            </span>
          )}

          <ButtonApply
            text={props.buttonText}
            style={{ padding: "16px 43px" }}
          />
          <span className={styles.alternative} onClick={openAnother}>
            {props.titleAnother}
          </span>
          {submitError && (
            <span className={styles.submitError}>{submitErrorText}</span>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default AuthModal;
