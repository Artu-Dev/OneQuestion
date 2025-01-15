import { useEffect } from "react";
import { socket } from "../../../socket";

export default function usePushNotifications() {
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        console.warn("Permissão para notificações negada.");
        return;
      }
      
      navigator.serviceWorker
        .register("service-worker.js")
        .then(async (serviceWorker) => {
          let subscription = await serviceWorker.pushManager.getSubscription();
          const publicKey = localStorage.getItem("publicKey");
  
          if (!subscription) {
            subscription = await serviceWorker.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: publicKey,
            });
          }
  
          socket.emit("register", subscription);
        });
    });

  }, []);
}
