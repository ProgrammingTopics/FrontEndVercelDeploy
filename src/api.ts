import axios from "axios";
import { userType } from "./types";

// axios.defaults.baseURL = 'https://.com';
export const signUpGraphRequest = async (email: string, password: string) => 
    await axios.get("/signIn",{
        params: {
            email: email,
            password: password
        },
        headers: {
            "content-type": "application/json"
        }
    }).then((result) => result);
    
export const signInGraphRequest = async (email: string, password: string) => 
    await axios.post<userType>("/signIn",{
        email: email,
        password: password,
    },{
        headers: {
            "content-type": "application/json"
        }
    }).then((result) => result.data);

export const getEmployersList = async (userType: string) => 
        await axios.get<userType[]>("/listEmployees", {
            params: {
                userType: userType
            },
            headers: {
                "content-type": "application/json"
            }
        }).then((result) => result.data);
        

export const getRepositoryByname = async (repoId: string) =>
axios
  .get("https://api.github.com/users/" + repoId + '/repos')  
        
  .then((response) => response.data);

  

export const getRepositoryById= async (repoId: string) =>
axios
  .get("https://api.github.com/repositories/" + repoId)
        
  .then((response) => response.data);