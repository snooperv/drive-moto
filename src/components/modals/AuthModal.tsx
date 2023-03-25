import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import styles from "./authModal.module.scss";
import logo from "../../assets/img/header/logo.svg";
import ButtonApply from "../buttons/ButtonApply";
import {
  onEmailChange,
  onNameChange,
  onPasswordChange,
  validateField,
} from "../../helpers/validateForm";
import { postRegistration } from "../../services/account";

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
  const [submitErrorName, setSubmitErrorName] = useState("");
  const [submitErrorText, setSubmitErrorText] = useState("");

  const openAnother = () => {
    clearForm();
    props.setOpenAnother(true);
    props.setOpen(false);
  };

  const clearForm = useCallback(() => {
    setName("");
    setEmail("");
    setPassword("");
    clearErrors();
  }, []);

  const clearErrors = () => {
    setNameValid("");
    setEmailValid("");
    setPasswordValid("");
    setSubmitErrorName("");
    setSubmitErrorText("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateField(email, setEmailValid);
    validateField(password, setPasswordValid);
    if (props.type === "register") {
      validateField(name, setNameValid);
    }
  };

  const handleClose = useCallback(() => {
    clearForm();
    props.setOpen(false);
  }, [clearForm, props]);

  useEffect(() => {
    if (
      props.type === "register" &&
      nameValid === "true" &&
      emailValid === "true" &&
      passwordValid === "true"
    ) {
      postRegistration({ email, password, name })
        .then((res) => {
          if (res.status >= 400 && res.status < 500) {
            if (
              Array.isArray(res.data) &&
              res.data[0].code === "InvalidUserName"
            ) {
              setSubmitErrorName("name");
              setSubmitErrorText(
                "Имя должно содержать только цифры или английские буквы без пробелов"
              );
            } else if (res.data.name) {
              setSubmitErrorName(res.data.name);
              setSubmitErrorText(res.data.errorMessage);
            } else {
              setSubmitErrorName("Another");
              setSubmitErrorText(res.data);
            }
          } else {
            localStorage.setItem("token", res.data.token);
            handleClose();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [
    email,
    emailValid,
    handleClose,
    name,
    nameValid,
    password,
    passwordValid,
    props.type,
    submitErrorName,
    submitErrorText,
  ]);

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
          {(nameValid === "false" || submitErrorName === "name") && (
            <span className={styles.error}>
              {submitErrorText || "Обязательно для заполнения"}
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
          {(emailValid === "false" || submitErrorName === "email") && (
            <span className={styles.error}>
              {submitErrorText || "Обязательно для заполнения"}
            </span>
          )}

          <input
            type="password"
            placeholder="Пароль"
            name="password"
            className={styles.textField}
            value={password}
            onChange={(e) => onPasswordChange(e, setPassword, clearErrors)}
          />
          {(passwordValid === "false" || submitErrorName === "password") && (
            <span className={styles.error}>
              {submitErrorText || "Обязательно для заполнения"}
            </span>
          )}

          <ButtonApply
            text={props.buttonText}
            style={{ padding: "16px 43px" }}
          />
          <span className={styles.alternative} onClick={openAnother}>
            {props.titleAnother}
          </span>
          {submitErrorName === "Another" && (
            <span className={styles.submitError}>{submitErrorText}</span>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default AuthModal;
