import "./QuestionContainer.css"
const QuestionContainer = ({question}:any) => {
  return (
    <h1 className="question-title">{question}</h1>
  )
}

export default QuestionContainer