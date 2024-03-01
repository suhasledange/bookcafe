import React from 'react'

const Button = ({text,className}) => {
  return (
    <button className={`hover:bg-black/[0.8] duration-150 bg-black text-white p-[0.3rem] px-3 tracking-wider ${className || ""}`}>{text}</button>
  )
}

export default Button
