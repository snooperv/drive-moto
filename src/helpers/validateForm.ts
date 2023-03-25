import React from "react";

export const validateField = (
  name: string,
  setNameValid: (nameValid: string) => void
) => {
  name.length > 0 ? setNameValid("true") : setNameValid("false");
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
