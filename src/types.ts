export type validatePassType = {
  emailErrorMessage: string;
  passwordErrorMessage: string;
};

export type setValidationErrors = React.Dispatch<
  React.SetStateAction<validatePassType>
>;

export type userType = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  team: string;
  userType: string;
  valuePerHour: number;
};

export type omitPasswordUserType = Omit<userType, "password">;

export type taskType = {
  inCharge: string;
  gitRepo: string;
};
