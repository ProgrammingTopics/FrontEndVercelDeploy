export type validatePassType = {
  emailErrorMessage: string;
  passwordErrorMessage: string;
};

export type setValidationErrors = React.Dispatch<
  React.SetStateAction<validatePassType>
>;

export type userType = {
  userId: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  team: string;
  userType: string;
  valuePerHour: number;
  hoursWorked: number;
};

export interface userApiResponse extends userType {
  status: boolean;
}

export type omitPasswordUserType = Omit<userType, "password">;
export type omitHoursWorkedType = Omit<userType, "hoursWorked">;
export type omitHoursWorkedAndPasswordType = Omit<
  omitPasswordUserType,
  "hoursWorked"
>;

export interface employeesTable extends omitPasswordUserType {
  concatFields: string;
}

export type taskType = {
  status: boolean;
  name: string;
  assign: string;
  gitRepo: string;
  description: string;
  taskStatus: string;
};

export type loginApiResponseType = {
  signedIn: boolean;
  role: string;
  team: string;
  userType: number;
  fullName: string;
  userID: string;
};

export type gitRepoType = {
  owner: {
    login: string;
  };
  name: string;
  id: number;
};

export type teamMemberType = {
  userId: string;
  fullName: string;
};
