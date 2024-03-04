
const Container = ({children,className}) => {
  return (
    <div className={`w-full md:px-0 px-2 mx-auto ${className || ""}`}>
         {children}           
    </div>
  )
}

export default Container
