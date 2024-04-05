import React from 'react'
import Loader from './Loader'

const Button = ({text,className,logo,loading}) => {
  return (
    <button type='submit' className={`flex items-center justify-center gap-3 transition-transform active:scale-95 hover:bg-black/[0.8] duration-150 bg-black text-white p-[0.3rem] px-3 tracking-wider ${className || ""}`}> {logo} {text} {loading ? <Loader className1="border-white w-6 h-6 "/> :""}</button>
  )
}
export default Button
