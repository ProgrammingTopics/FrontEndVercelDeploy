import { taskType } from "../../types";

const UserManager = (function () {
  let email = "";
  let fullName = "";
  let role = "";
  let team = "";
  let tasks: taskType;
  let userType = "RH";
  const getEmail = () => email;
  const getFullName = () => fullName;
  const getRole = () => role;
  const getTeam = () => team;

  const setTasks = (apiTasks: taskType) => {
    tasks = apiTasks;
  };

  const getTasks = () => tasks;

  const setUser = (
    loggedEmail: string,
    loggedFullName: string,
    loggedRole: string,
    loggedTeam: string,
    loggedUserType: string
  ) => {
    email = loggedEmail;
    fullName = loggedFullName;
    role = loggedRole;
    team = loggedTeam;
    userType = loggedUserType;
  };

  const getUserType = () => userType;
  return {
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
