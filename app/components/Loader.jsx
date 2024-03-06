
const Loader = ({className}) => {
  return (
    <div className={`flex items-center justify-center${className || ""}`}>
    <div className="animate-spin rounded-full border-t-4 border-black border-solid h-12 w-12"></div>
  </div>
  )
}

export default Loader
