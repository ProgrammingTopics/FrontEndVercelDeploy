import axios from "axios";
import { employeesTable, taskType, userApiResponse } from "./types";

axios.defaults.baseURL = "https://rh-back-roan.vercel.app";
// axios.defaults.baseURL = "http://localhost:8080";
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
    .post<{ status: boolean }>("/signUp", {
      email: email,
      password: password,
      role: role,
      team: team,
      userType: userType,
      fullName: fullName,
      valuePerHour: valuePerHour,
    })
    .then((result) => result.data);

export const signInGraphRequest = async (email: string, password: string) =>
  await axios
    .post<userApiResponse>("/signIn", {
      email: email,
      password: password,
    })
    .then((result) => result.data);

export const getEmployersList = async () =>
  await axios
    .get<employeesTable[]>("/getAllUsers", {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((result) => {
      return result.data;
    });

export const editEmployeeInfo = async (
  userId: string,
  email: string,
  role: string,
  team: string,
  userType: string,
  fullName: string,
  valuePerHour: number
) =>
  await axios
    .put<{ status: boolean }>("/editUser", {
      userId: userId,
      email: email,
      role: role,
      team: team,
      userType: userType,
      fullName: fullName,
      valuePerHour: valuePerHour,
    })
    .then((result) => result.data);

export const getTeam = async (teamName: string) =>
  await axios
    .get("/getUsersByTeam", {
      params: {
        team: teamName,
      },
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });

export const getUserTasksById = (userId: string) =>
  axios
    .get("/getTasksByUser", {
      params: {
        userId: userId,
      },
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.data);
export const createTask = async (
  name: string,
  githubUrl: string,
  description: string
) =>
  axios
    .post("/createTask", {
      name: name,
      description: description,
      githubUrl: githubUrl,
    })
    .then((res) => res.data);

export const updateTask = (taskId: string, userId: string) =>
  axios
    .post("/delegateTask", {
      userId: userId,
      taskId: taskId,
    })
    .then((res) => res.data);

export const getTeamTasks = async (teamName: string) =>
  await axios
    .get<taskType[]>("/getTasksByTeam", {
      params: {
        team: teamName,
      },
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.data);

export const getRepositoryByName = (repoId: string) =>
  axios
    .get("https://api.github.com/users/" + repoId + "/repos")

    .then((response) => response.data);

export const getEmployeeById = (userId: string) =>
  axios
    .get("/getUserByID", {
      params: {
        userId: userId,
      },
    })
    .then((res) => res.data);

export const fireEmployerById = (userId: string) =>
  axios
    .delete<{ status: boolean; mustBePaid: number }>("/deleteUser", {
      params: {
        userId: userId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);

export const startWork = (userId: string, startTime: number) =>
  axios
    .post("/startWorkRoutine", { userId: userId, timeStamp: startTime })
    .then((res) => res.data);

export const endWork = (userId: string, endTime: number) =>
  axios
    .post("/endWorkRoutine", { userId: userId, timeStamp: endTime })
    .then((res) => res.data);

export const completeTaskApi = (taskId: string) =>
  axios
    .put("/changeTaskStatus", {
      taskId: taskId,
    })
    .then((res) => res.data);
