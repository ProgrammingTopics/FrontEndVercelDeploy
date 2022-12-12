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
  lastTimeStamp: number;
  valuePerHour: number;
  hoursWorked: number;
};

export interface userApiResponse extends userType {
  status: boolean;
}

export type omitTimeStampType = Omit<userType, "lastTimeStamp">;
export type omitPasswordUserType = Omit<omitTimeStampType, "password">;
export type omitHoursWorkedType = Omit<omitTimeStampType, "hoursWorked">;
export type omitHoursWorkedAndPasswordType = Omit<
  omitPasswordUserType,
  "hoursWorked"
>;

export interface employeesTable extends omitPasswordUserType {
  concatFields: string;
}

export type taskType = {
  taskId: string;
  name: string;
  assigns: string;
  githubUrl: string;
  description: string;
  status: string /* onGoing Completed */;
};

export type loginApiResponseType = {
  signedIn: boolean;
  role: string;
  team: string;
  userType: number;
  fullName: string;
  userId: string;
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
