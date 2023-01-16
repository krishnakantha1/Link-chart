import React, { createContext, useState } from 'react'

const initialUserState = {
    user_name : null,
    user_jwt : null,
    logged_in : false
}

export const UserCredentialContextProvider = createContext(initialUserState)

export const UserCredentialProvider = ({ children }) => {
    const [userDetails,setUserDetails] = useState(initialUserState)

    const loggin = (user_name,user_jwt)=>{
        setUserDetails({
            user_name,
            user_jwt,
            logged_in : true
        })
    }

    const logout = ()=>{
        setUserDetails(initialUserState)
    }

  return (
    <UserCredentialContextProvider.Provider value={{
        userDetails,
        loggin,
        logout
    }}>
        {children}
    </UserCredentialContextProvider.Provider>
  )
}
