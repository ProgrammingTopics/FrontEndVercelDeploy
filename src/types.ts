export type validatePassType = {
  emailErrorMessage: string;
  passwordErrorMessage: string;
}

export type setValidationErrors =  React.Dispatch<React.SetStateAction<validatePassType>>;

export type userType = {
  email: string,
  fullName: string,
  role: string,
  team: string
}

export type taskType = {
  inCharge: string;
  gitRepo: string;
}