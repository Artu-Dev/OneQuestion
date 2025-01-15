import { useEffect } from "react";
import { socket } from "../../../socket";

export function useSocket(eventHandlers: Record<string, (...args: any[]) => void>) {
  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on("connect", () => console.log("Conectado"));
    socket.on("disconnect", () => console.log("Desconectado"));

    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
    socket.off("connect");
    socket.off("disconnect");
    Object.keys(eventHandlers).forEach((event) => {
        socket.off(event);
    });
    };


    }, [eventHandlers]);
  }
