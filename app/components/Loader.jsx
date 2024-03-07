
const Loader = ({className,className1}) => {
  return (
    <div className={`flex items-center justify-center${className || ""}`}>
    <div className={`animate-spin rounded-full border-t-4 border-black border-solid h-12 w-12 ${className1 || ""}`}></div>
  </div>
  )
}

export default Loader
