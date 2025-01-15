import './App.css'
import QuestionContainer from './components/QuestionContainer/QuestionContainer'
import { useState } from 'react';
import { InputContainer } from './components/InputContainer/InputContainer';
import { socket } from "./socket"
import { Awsners } from './components/Awsners/Awsners';
import { Button } from './components/Button/Button';
import usePushNotifications from './components/hooks/usePushNotifications/usePushNotifications';
import { useSocket } from './components/hooks/SocketsEventsHandler/useSocket';

function App() {
  const [question, setQuestion] = useState("")
  const [awsner, setAwsner] = useState("")
  const [otherAwsner, setOtherAwsner] = useState([])
  // const [questionType, setQuestionType] = useState("normal")
  
  const eventHandlers = {
    session: ({sessionID, publicKey}: any) => {
      socket.auth = {sessionID, publicKey};
      localStorage.setItem("sessionID", sessionID);
      localStorage.setItem("publicKey", publicKey);
    },
    question: ({q}: any) => {
      setQuestion(q);
    },
    awnsersResponse: (data: any) => {
      setOtherAwsner(data);
    },
  };

  usePushNotifications();
  useSocket(eventHandlers);
  

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
