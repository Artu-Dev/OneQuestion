import './App.css'
import QuestionContainer from './components/QuestionContainer/QuestionContainer'
import { useEffect, useState } from 'react';
import { InputContainer } from './components/InputContainer/InputContainer';
import { socket } from "./socket"
import { Awsners } from './components/Awsners/Awsners';
import { Button } from './components/Button/Button';

function App() {
  const [question, setQuestion] = useState("")
  const [awsner, setAwsner] = useState("")
  const [otherAwsner, setOtherAwsner] = useState([])
  // const [questionType, setQuestionType] = useState("normal")

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");
    if(sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    Notification.requestPermission()
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

        socket.emit("register", subscription)
      });


    function onQuestion({q}:any) {
      setQuestion(q);
      // setQuestionType(type);
    }

    function onSession({sessionID, publicKey}:any) {
      socket.auth = {sessionID, publicKey};
      localStorage.setItem("sessionID", sessionID);
      localStorage.setItem("publicKey", publicKey);
    }

    // otimizar depois, componentizar e mesclar algumas
    socket.on("connect", () => console.log("conectado"));
    socket.on('disconnect', () => console.log("desconectado"));
    socket.on("session", (data) => onSession(data));
    socket.on('question', (data) => onQuestion(data));
    socket.on('awnsersResponse', (data) => setOtherAwsner(data));

    return () => {
      socket.off("connect", () => console.log("conectado"));
      socket.off('disconnect', () => console.log("desconectado"));
      socket.off("session", (data) => onSession(data));
      socket.off('question', (data) => onQuestion(data));
      socket.off('awnsersResponse', (data) => setAwsner(data));
    }
  }, [])
  

  function handleOnChange(e: any) {
    setAwsner(e.target.value)
  }

  function handleOnClick() {
    socket.emit("awsners", awsner)
  }

  function handleLikeBtn(awsnerID: string) {
    socket.emit("like", awsnerID)
  }

  return (
    <main>
      <QuestionContainer 
        question={question}
      />
      <InputContainer
        onChange={handleOnChange}
      />
      <Button onClick={handleOnClick}/>

      {otherAwsner?.length > 0  &&
        <Awsners data={otherAwsner} onLikeAwsner={(awsnerID:string) => handleLikeBtn(awsnerID)}/>
      }
    </main>
  )
}

export default App
