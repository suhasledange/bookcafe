'use client'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store'

export default function Providers({children}) {
    
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
