
const Container = ({children,className}) => {
  return (
    <div className={`w-full max-w-screen-xl mx-auto ${className || ""}`}>
         {children}           
    </div>
  )
}

export default Container
