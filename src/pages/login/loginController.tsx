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

export const validateUser = (
  setErrorMessages: setValidationErrors,
  user: string
) => {
  user.length > 0
    ? setErrorMessages((prevState) => ({
        ...prevState,
        userErrorMessage: "",
      }))
    : setErrorMessages((prevState) => ({
        ...prevState,
        userErrorMessage: "Invalid user",
      }));
};
