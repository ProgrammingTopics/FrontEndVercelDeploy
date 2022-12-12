import { taskType } from "../../types";

const UserManager = (function () {
  let email = "";
  let fullName = "";
  let role = "";
  let team = "";
  let tasks: taskType[];
  let userType = "RH";
  let userId = "";
  let initialTimeStamp = 0;

  const getEmail = () => email;
  const getFullName = () => fullName;
  const getRole = () => role;
  const getTeam = () => team;

  const setTasks = (apiTasks: taskType[]) => {
    tasks = apiTasks;
  };

  const getTasks = () => tasks;

  const getId = () => userId;

  const setUser = (
    loggedId: string,
    loggedEmail: string,
    loggedFullName: string,
    loggedRole: string,
    loggedTeam: string,
    loggedUserType: string,
    loggedTimeStamp: number
  ) => {
    userId = loggedId;
    email = loggedEmail;
    fullName = loggedFullName;
    role = loggedRole;
    team = loggedTeam;
    userType = loggedUserType;
    initialTimeStamp = loggedTimeStamp;
  };

  const logOffUser = () => {
    email = "";
    fullName = "";
    role = "";
    team = "";
    tasks = [];
    userType = "";
    userId = "";
  };

  const setTime = (time: number) => {
    initialTimeStamp = time;
  };

  const getTime = () => initialTimeStamp;

  const getUserType = () => userType;
  return {
    setTime: setTime,
    getTime: getTime,
    logOffUser: logOffUser,
    getId: getId,
    getEmail: getEmail,
    setUser: setUser,
    getFullName: getFullName,
    getRole: getRole,
    getTeam: getTeam,
    setTasks: setTasks,
    getTasks: getTasks,
    getUserType: getUserType,
  };
})();

export default UserManager;
