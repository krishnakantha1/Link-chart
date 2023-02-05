import React, { createContext, useCallback, useState } from 'react'

const initialUserState = {
    user_name : null,
    user_jwt : null,
    logged_in : false
}

export const UserCredentialContextProvider = createContext(initialUserState)

export const UserCredentialProvider = ({ children }) => {
    const [userDetails,setUserDetails] = useState(initialUserState)

    const loggin = useCallback((user_name,user_jwt)=>{
        localStorage.setItem('cred',user_jwt)

        setUserDetails({
            user_name,
            user_jwt,
            logged_in : true
        })
    },[setUserDetails])

    const logout = useCallback(()=>{
        localStorage.removeItem('cred')
        setUserDetails(initialUserState)
        //setUserDetails({user_name : null, user_jwt : null, logged_in : null })
    },[setUserDetails])

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
