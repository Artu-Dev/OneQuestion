import { io } from "socket.io-client";

// const URL =  process.env.NODE_ENV === 'production' ? undefined : 'https://onequestionserver.onrender.com/';
const URL = 'https://one-question-server.vercel.app/';

export const socket = io(URL, {
    auth: {
        sessionID: localStorage.getItem("sessionID")
    }
});
