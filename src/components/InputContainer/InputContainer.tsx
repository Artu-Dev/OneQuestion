import "./InputContainer.css"
export const InputContainer = ({questionType, onChange}: any) => {
  return (
    <>  
      <textarea
        className="awsner-input"
        maxLength={200}  
        onChange={onChange}
      />
    </>
  )
}
