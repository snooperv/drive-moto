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

export const validateAnswer = (
  res: any,
  setSubmitErrorName: (submitErrorName: string) => void,
  setSubmitErrorText: (submitErrorText: string) => void
) => {
  if (res.status >= 400 && res.status < 500) {
    try {
      if (Array.isArray(res.data) && res.data[0].code === "InvalidUserName") {
        setSubmitErrorName("name");
        setSubmitErrorText(
          "Имя должно содержать только цифры или английские буквы без пробелов"
        );
      } else if (
        Array.isArray(res.data) &&
        res.data[0].code === "DuplicateUserName"
      ) {
        setSubmitErrorName("name");
        setSubmitErrorText("Пользователь с таким именем уже существует");
      } else if (res.data.name) {
        setSubmitErrorName(res.data.name);
        setSubmitErrorText(res.data.errorMessage);
      } else {
        setSubmitErrorName("Another");
        setSubmitErrorText(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  } else {
    return true;
  }
};
