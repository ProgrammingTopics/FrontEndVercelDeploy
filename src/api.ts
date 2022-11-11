import axios from "axios";

axios.defaults.baseURL = 'https://.com';
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
    await axios.get("/signUp",{
        params: {
            email: email,
            password: password
        },
        headers: {
            "content-type": "application/json"
        }
    }).then((result) => result);