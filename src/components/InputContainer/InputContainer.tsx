import { useState } from "react"
import "./InputContainer.css"
export const InputContainer = ({onChange}: any) => {
  const [characteresLeft, setCharacteresLeft] = useState(200)
  const [awsner, setAwsner] = useState("")


  function onChangeInput(e: any) {
    const value = e.target.value
    const length = value.length
    setCharacteresLeft(200 - length)
    setAwsner(value)
    onChange(e)
  }

  return (
    <label className="awsner-label">  
      <textarea
        value={awsner}
        className="awsner-input"
        maxLength={200}  
        onChange={onChangeInput}
        name="awsner"
      />

      <span className="charactersLeft">{characteresLeft}</span>
    </label>
  )
}
