import React, { useContext, useState } from 'react'
import axios from 'axios'

import { InputText1 } from '../GeneralUtil/InputText1'
import { host, loginPath } from '../../constants'
import { UserCredentialContextProvider } from '../UserCredentialProvider/UserCredentialProvider'
import styles from './CSS/Common.module.css'

export const Login = () => {
  const { loggin } = useContext(UserCredentialContextProvider)
  const [entry,setEntry] = useState({email : '', password : ''})

  const handleChange = (e)=>{
    setEntry(prev=>{
      return { ...prev, [e.target.id]: e.target.value }
    })
  }

  const handleSubmit = async (e)=>{
    
    e.preventDefault()
    try{
      const resp = await axios({
        url : `${host}${loginPath}`,
        method : 'POST',
        headers : 'application/json',
        data : {
          email : entry.email,
          password : entry.password
        }
      })

      const { error, message } = resp.data
      if(error){
        console.log(message)
      }else{
        const { username, jwt } = resp.data
        loggin(username, jwt)
      }
      
    }catch(e){
      console.log('error while logging in.')
    }
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <InputText1 value={entry.email} handleChange={handleChange} label="Email" compID="email" type="text" />
        </div>
        <div className={styles.inputContainer}>
          <InputText1 value={entry.password} handleChange={handleChange} label="Password" compID="password" type="password" />
        </div>
        <div className={styles.inputContainer}>
          <button>Login</button>
        </div>
      </form>
      <div className={styles.errorContainer}>
        <p></p>
      </div>
    </div>
  )
}
