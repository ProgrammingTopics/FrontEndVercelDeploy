import axios from "axios";
import {
  omitPasswordUserType,
  taskType,
  userApiResponse,
  userType,
} from "./types";

axios.defaults.baseURL = "https://rh-back-roan.vercel.app";
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
      "/signUp",
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
    .post<userApiResponse>(
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

export const getRepositoryByName = async (repoId: string) =>
  axios
    .get("https://api.github.com/users/" + repoId + "/repos")

    .then((response) => response.data);
