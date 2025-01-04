import "./InputContainer.css"
export const InputContainer = ({onChange}: any) => {
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
