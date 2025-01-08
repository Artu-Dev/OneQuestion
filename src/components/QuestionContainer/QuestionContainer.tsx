import "./QuestionContainer.css"
const QuestionContainer = ({question}:any) => {
  return (
    <>
      {!question ?
        <img className="loading" src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif" alt="Carregando imagem..." />
        :
        <h1 className="question-title">{question}</h1>
      }
    </>
  )
}

export default QuestionContainer