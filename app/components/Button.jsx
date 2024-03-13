import React from 'react'

const Button = ({text,className,logo}) => {
  return (
    <button className={`flex items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-black/[0.8] duration-150 bg-black text-white p-[0.3rem] px-3 tracking-wider ${className || ""}`}> {logo} {text}</button>
  )
}
export default Button
