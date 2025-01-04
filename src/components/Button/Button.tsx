import "./Button.css"

export const Button = ({onClick}: any) => {
  return (
    <button 
        className="submit-button"
        onClick={onClick}
    >
        Enviar resposta
    </button>
  )
}
