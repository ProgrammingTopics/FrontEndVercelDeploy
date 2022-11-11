export type validatePassType = {
  userErrorMessage: string;
  passwordErrorMessage: string;
}

export type setValidationErrors =  React.Dispatch<React.SetStateAction<validatePassType>>;

export type userType = {
  name: string,
  role: string,
  team: string
}