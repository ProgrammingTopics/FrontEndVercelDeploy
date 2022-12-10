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

export interface userApiResponse extends userType {
  status: boolean;
}

export type omitPasswordUserType = Omit<userType, "password">;
export interface employeesTable extends omitPasswordUserType {
  concatFields: string;
}

export type taskType = {
  status: string;
  name: string;
  assign: string[];
  gitRepo: string;
  description: string;
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
