import { taskType } from "../../types";

const UserManager = (function () {
  let email = "";
  let fullName = "";
  let role = "";
  let team = "";
  let tasks: taskType[];
  let userType = "";
  let id = "";

  const getEmail = () => email;
  const getFullName = () => fullName;
  const getRole = () => role;
  const getTeam = () => team;

  const setTasks = (apiTasks: taskType[]) => {
    tasks = apiTasks;
  };

  const getTasks = () => tasks;

  const getId = () => id;

  const setUser = (
    loggedId: string,
    loggedEmail: string,
    loggedFullName: string,
    loggedRole: string,
    loggedTeam: string,
    loggedUserType: string
  ) => {
    id = loggedId;
    email = loggedEmail;
    fullName = loggedFullName;
    role = loggedRole;
    team = loggedTeam;
    userType = loggedUserType;
  };

  const logOffUser = () => {
    email = "";
    fullName = "";
    role = "";
    team = "";
    tasks = [];
    userType = "";
    id = "";
  };

  const getUserType = () => userType;
  return {
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
