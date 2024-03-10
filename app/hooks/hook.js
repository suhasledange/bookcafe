'use client'

import { useEffect, useState } from "react"

export const useDebounce = (value,delay=400) =>{

    const [Dvalue,setDValue] = useState(value)

    useEffect(()=>{

        const timeout = setTimeout(()=>{
            setDValue(value)
        },delay)

        return ()=> clearTimeout(timeout)

    },[value,delay])
    
    return Dvalue;
}