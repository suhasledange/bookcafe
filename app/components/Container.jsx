
const Container = ({children,className}) => {
  return (
    <div className={`w-full mx-auto ${className || ""}`}>
         {children}           
    </div>
  )
}

export default Container
