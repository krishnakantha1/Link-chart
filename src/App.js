import React, { useEffect, useState, lazy, Suspense, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'

import "./App.css"

import { UserCredentialContextProvider } from './components/UserCredentialProvider/UserCredentialProvider'
import { host, loginPath } from './constants'

import { Nav } from './components/Nav/Nav';
import { UserLoginCheck } from './components/Loaders/UserLoginCheck'
import LogReg from './components/LogReg/LogReg';
const LineChartContainer = lazy(()=> import('./components/LinkChart/LineChartContainer'))
const LinkChartList = lazy(()=> import('./components/LinkChartList/LinkChartList')) 
const Home = lazy(()=> import('./components/Home/Home')) 

const App = ()=>{
  const { userDetails : {user_name, user_jwt, logged_in}, loggin, logout } = useContext(UserCredentialContextProvider)

  const [windowDim,setWindowDim] = useState([window.innerHeight,window.innerWidth]);

  useEffect(()=>{
    
    window.addEventListener('resize',()=>{
      setWindowDim([window.innerHeight,window.innerWidth])
    })

    const tryLogin = async ()=>{
      const jwt = localStorage.getItem('cred')

      if(jwt){
        try{
          const resp = await axios({
            url : `${host}${loginPath}`,
            method : 'POST',
            headers : 'application/json',
            data : {
              jwt : jwt
            } 
          })
  
          const { error, message } = resp.data
          if(error){
            console.log(message)
            logout()
          }else{
            const { username, jwt } = resp.data
            loggin(username, jwt)
          }
        }catch(e){
          console.log("error in logging in.")
        }
      }else{
        console.log("no jwt")
      }
    }

    tryLogin()
  },[loggin,logout])

  return (
    <>
      <Nav/>
      <Suspense fallback={<div>Loading...........</div>}>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/linkchart' element={
                                            <UserLoginCheck render={()=>(<LinkChartList/>)}
                                              condition={logged_in && user_jwt!==null && user_jwt!==undefined}
                                              promptForFalse={'Please login to use these features'}
                                            />
          } />
          <Route path='/linkchart/:chart_id' element={
                                            <UserLoginCheck render={()=>(<LineChartContainer wHeight={windowDim[0]} wWidth={windowDim[1]}/>)}
                                              condition={logged_in && user_jwt!==null && user_jwt!==undefined}
                                              promptForFalse={'Please login to use these features'}
                                            />
          } /> 
          <Route path='/login' element={
                                          <UserLoginCheck render={()=>(<LogReg/>)}
                                              condition={!(logged_in && user_jwt!==null && user_jwt!==undefined)}
                                              promptForFalse={`Logged in as ${user_name}`}
                                          />
          }/>
          <Route path='/register' element={
                                          <UserLoginCheck render={()=>(<LogReg/>)}
                                              condition={!(logged_in && user_jwt!==null && user_jwt!==undefined)}
                                              promptForFalse={`Logged in as ${user_name}`}
                                          />

          }/>
        
      </Routes>
      </Suspense>
    </>
  )
}

export default App