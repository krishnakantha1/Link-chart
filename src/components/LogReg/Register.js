import React, { useContext, useState } from 'react'
import axios from 'axios'

import { InputText1 } from '../GeneralUtil/InputText1'
import { host, registerPath } from '../../constants'
import { UserCredentialContextProvider } from '../UserCredentialProvider/UserCredentialProvider'
import { LoadingAnimation1 } from '../Loaders/LoadingAnimation1'
import styles from './CSS/Common.module.css'


export const Register = () => {
  const { loggin } = useContext(UserCredentialContextProvider)
  const [entry,setEntry] = useState({ username : '', email : '', password : '', repassword : '' })
  const [loading,setLoading] = useState(false)

  const handleChange = (e)=>{
    setEntry(prev=>{
      return { ...prev, [e.target.id]: e.target.value }
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      const resp = await axios({
        url : `${host}${registerPath}`,
        method : 'POST',
        headers : 'application/json',
        data : {
          email : entry.email,
          username : entry.username,
          password : entry.password
        }
      })
      setLoading(false)
      const { error, message } = resp.data
      if(error){
        console.log(message)
      }else{
        const { username, jwt } = resp.data
        loggin(username, jwt)
      }
    }catch(e){
      console.log('issue in registration.')
    }
  }

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <InputText1 value={entry.username} handleChange={handleChange} label="Username" compID="username" type="text" />
        </div>
        <div className={styles.inputContainer}>
          <InputText1 value={entry.email} handleChange={handleChange} label="Email" compID="email" type="text" />
        </div>
        <div className={styles.inputContainer}>
          <InputText1 value={entry.password} handleChange={handleChange} label="Password" compID="password" type="password" />
        </div>
        <div className={styles.inputContainer}>
          <InputText1 value={entry.repassword} handleChange={handleChange} label="Re-Password" compID="repassword" type="password" />
        </div>
        <div className={styles.inputContainer}>
          <button>Login</button>
        </div>
      </form>
      <div className={styles.errorContainer}>
        <p></p>
      </div>
      {
        loading && (
          <div className={styles.loader}>
            <div className={styles.loader_innercontainer}>
              <LoadingAnimation1/>
            </div>
          </div>
        )
      }
      
    </div>
  )
}
