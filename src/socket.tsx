import { io } from "socket.io-client";

const URL =  process.env.NODE_ENV === 'development' ? "http://localhost:5345" : 'https://onequestionserver.onrender.com/';
// const URL = "https://onequestionserver.onrender.com"


export const socket = io(URL, {
    auth: {
        sessionID: localStorage.getItem("sessionID")
    }
});
