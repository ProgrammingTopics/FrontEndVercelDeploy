import axios from "axios";
import { omitPasswordUserType, taskType, userType } from "./types";

// axios.defaults.baseURL = 'https://.com';
export const signUpApi = async (
  email: string,
  password: string,
  role: string,
  team: string,
  userType: string,
  fullName: string,
  valuePerHour: number
) =>
  await axios
    .post<{ status: boolean }>(
      "/signIn",
      {
        email: email,
        password: password,
        role: role,
        team: team,
        usertype: userType,
        fullName: fullName,
        valuePerHour: valuePerHour,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then((result) => result.data);

export const signInGraphRequest = async (email: string, password: string) =>
  await axios
    .post<userType>(
      "/signIn",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then((result) => result.data);

export const getEmployersList = async (userType: string) =>
  await axios
    .get<omitPasswordUserType[]>("/listEmployees", {
      params: {
        userType: userType,
      },
      headers: {
        "content-type": "application/json",
      },
    })
    .then((result) => result.data);

export const getRepositoryById = async (repoId: string) =>
  axios
    .get("https://api.github.com/repositories/" + repoId)
    .then((response) => response.data);

export const editEmployeeInfo = async (
  id: string,
  email: string,
  role: string,
  team: string,
  userType: string,
  fullName: string,
  valuePerHour: number
) =>
  await axios
    .put<{ status: boolean }>(
      "/editEmployee",
      {
        id: id,
        email: email,
        role: role,
        team: team,
        usertype: userType,
        fullName: fullName,
        valuePerHour: valuePerHour,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    .then((result) => result.data);

export const getTeam = async (teamName: string) =>
  await axios
    .get("/getTeams", {
      params: {
        teamName: teamName,
      },
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.data);

export const getTeamTasks = async (teamName: string) =>
  await axios
    .get<taskType[]>("/getTeamTasks", {
      params: {
        teamName: teamName,
      },
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.data);

export const getRepositoryByname = async (repoId: string) =>
  axios
    .get("https://api.github.com/users/" + repoId + "/repos")

    .then((response) => response.data);
