import React, { createContext, useEffect, useState } from "react"
import NetInfo from "@react-native-community/netinfo"

export const NetworkContext = createContext<{ isConnected: boolean }>({ isConnected: true })

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected)
    })
    return () => unsubscribe()
  }, [])

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  )
}
