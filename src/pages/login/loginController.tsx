import { setValidationErrors } from "../../types";

export const validatePassword = (
  setErrorMessages: setValidationErrors,
  password: string
) => {
  password.length > 0
    ? setErrorMessages((prevState) => ({
        ...prevState,
        passwordErrorMessage: "",
      }))
    : setErrorMessages((prevState) => ({
        ...prevState,
        passwordErrorMessage: "Invalid password",
      }));
};

export const validateEmail = (
  setErrorMessages: setValidationErrors,
  email: string
) => {
  email.length > 0
    ? setErrorMessages((prevState) => ({
        ...prevState,
        emailErrorMessage: "",
      }))
    : setErrorMessages((prevState) => ({
        ...prevState,
        emailErrorMessage: "Invalid user",
      }));
};
