self.addEventListener("push", function (event) {
    const body = event.data?.text() ?? "Responda a nova pergunta de hoje!";
    const options = {
        body,
        icon: "/apple-touch-icon.png",
        badge: "/favicon-16x16.png",
        actions: [
            {
                action: "responder",
                title: "Responder agora",
            }
        ],
        tag: "pergunta-do-dia",
        renotify: true
    };

    self.addEventListener("notificationclick", function (event) {
        event.notification.close();
        if (event.action === "responder") {
            event.waitUntil(
                clients.openWindow("https://one-question-one.vercel.app/")
            );
        }
    });

    event.waitUntil(
        self.registration.showNotification("Pergunta do dia!", options)
    );
});