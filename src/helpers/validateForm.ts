import React from "react";

export const validateName = (
  name: string,
  setNameValid: (nameValid: string) => void
) => {
  name.length > 2 ? setNameValid("true") : setNameValid("false");
};

export const validateEmail = (
  email: string,
  setEmailValid: (emailValid: string) => void
) => {
  email.includes("@") ? setEmailValid("true") : setEmailValid("false");
};

export const validatePassword = (
  password: string,
  setPasswordValid: (passwordValid: string) => void
) => {
  password.length > 2 ? setPasswordValid("true") : setPasswordValid("false");
};

export const onNameChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setName: (name: string) => void,
  clearErrors: () => void
) => {
  setName(e.target.value);
  clearErrors();
};

export const onEmailChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setEmail: (email: string) => void,
  clearErrors: () => void
) => {
  setEmail(e.target.value);
  clearErrors();
};

export const onPasswordChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPassword: (password: string) => void,
  clearErrors: () => void
) => {
  setPassword(e.target.value);
  clearErrors();
};
