import "./Button.css"

export const Button = ({onClick}) => {
  return (
    <button 
        className="submit-button"
        onClick={onClick}
    >
        Enviar resposta
    </button>
  )
}
