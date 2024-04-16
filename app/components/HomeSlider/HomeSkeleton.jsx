
const HomeSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-4 w-full mx-auto shrink custom-pulse">
    <div className=" w-44 h-56 animate-pulse bg-gray-300"></div>
    <div className="text-left">
        <h1 className="font-bold mb-4 text-black text-lg animate-pulse w-28 h-6 bg-gray-300"></h1>
        <h1 className="font-bold md:text-3xl text-2xl animate-pulse w-28 h-6 bg-gray-300 mb-2"></h1>
        <h1 className="font-medium text-md mb-3 animate-pulse w-20 h-3 bg-gray-300"></h1>
        <p className="font-semibold text-gray-700 animate-pulse w-24 h-5 bg-gray-300"></p>
        <div className="flex gap-3 mt-5 items-center">
            <button className="cursor-not-allowed bg-gray-300 md:text-md text-sm text-white px-12 py-3 tracking-wider animate-pulse">
                
            </button>
            <button className="cursor-not-allowed bg-gray-300 md:text-md text-sm text-white px-12 py-3 tracking-wider animate-pulse">
                
            </button>
        </div>
    </div>
</div>
  )
}

export default HomeSkeleton
