import React, { createContext, useState } from 'react'

const initialUserState = {
    user_name : "krishna5",
    user_jwt : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJVU0VSX2tyaXNobmE1I0JnSERqREJEQmpGYWkiLCJ1c2VybmFtZSI6ImtyaXNobmE1IiwiZW1haWwiOiJrcmlzaG5hM0BnbWFpbCIsInBhc3N3b3JkIjoiMTIzNDVAIiwiaWF0IjoxNjc0Mzc3MzkyfQ.ZAjKn26WssJanaj__yDQlLtFKykrszkCW__-_-eg0nw",
    logged_in : true
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
