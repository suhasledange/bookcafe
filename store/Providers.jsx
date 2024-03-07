'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import UserProvider from './UserProvider'

export default function Providers({children}) {

  return (
    <Provider store={store}>
      <UserProvider>
      {children}
      </UserProvider>
    </Provider>
  )
}
