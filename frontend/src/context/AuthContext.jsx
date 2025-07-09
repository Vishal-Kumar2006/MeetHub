import { Children, createContext, useContext, useState } from "react";
import axios, { HttpStatusCode } from 'axios';
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext({});

const client = axios.create({
    baseURL:"http://localhost:8000/api/v1/user"
})

export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext);
    
    const [userData, setUserData] = useState(authContext);

    // const router = useNavigate();

    const handleRegister = async(name, username, password) => {
        try {
            let request = await client.post("/register", {
                name:name,
                username:username,
                password: password

            })

            if(request.status === HttpStatusCode.Created) {
                return request.data.message;
            }
        } catch(error) {
            throw error;
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username:username,
                password: password
            })

            if(request.status === HttpStatusCode.Ok) {
                localStorage.setItem("token", request.data.token);
                console.log(request.data);
                return request.data.message;
            } 
        } catch(error) {
            throw error;
        }
    } 


    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let req = client.post("/add_to_activity", {
                token:localStorage.getItem("token"),
                meeting_code:meetingCode
            });

            return await req;
        } catch (error) {
            throw e;
        }
    }




    const data = {
        userData, setUserData, handleRegister, handleLogin, getHistoryOfUser, addToUserHistory
    }


    return (
        <AuthContext.Provider value={data}>
            {children}

        </AuthContext.Provider>
    )
}