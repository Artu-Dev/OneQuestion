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
  const [questionType, setQuestionType] = useState("normal")

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");
    if(sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    function onQuestion({q, type}:any) {
      setQuestion(q);
      setQuestionType(type);
    }

    function onSession({sessionID, userID}:any) {
      console.log({sessionID})
      socket.auth = {sessionID};
      localStorage.setItem("sessionID", sessionID);
      socket.userID = userID
    }


    socket.on("connect", () => console.log("conectado"));
    socket.on('disconnect', () => console.log("desconectado"));
    socket.on("session", ({sessionID, userID}) => onSession({sessionID, userID}));
    socket.on('question', (data) => onQuestion(data));
    socket.on('awnsersResponse', (data) => setOtherAwsner(data));

    return () => {
      socket.off("connect", () => console.log("conectado"));
      socket.off('disconnect', () => console.log("desconectado"));
      socket.off("session", ({sessionID, userID}) => onSession({sessionID, userID}));
      socket.off('question', (data) => onQuestion(data));
      socket.off('awnsersResponse', (data) => setAwsner(data));
    }
  }, [])
  

  function handleOnChange(e) {
    setAwsner(e.target.value)
  }

  function handleOnClick() {
    socket.emit("awsners", awsner)
  }

  return (
    <main>
      <QuestionContainer 
        question={question}
      />
      <InputContainer 
        questionType={questionType}
        onChange={handleOnChange}
      />
      <Button onClick={handleOnClick}/>

      <Awsners data={otherAwsner}/>
    </main>
  )
}

export default App
