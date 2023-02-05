import React from 'react'
import { useLocation } from 'react-router-dom'

import styles from './CSS/LogReg.module.css'
import { Login } from './Login'
import { Register } from './Register'

const LogReg = () => {
  const loc = useLocation()
  const path = loc.pathname

  return (
    <div className={styles.container}>
      {
        path.toLowerCase()==='/login' && (
          <Login/>
        )
      }
      {
        path.toLowerCase()==='/register' && (
          <Register/>
        )
      }
    </div>
  )
}

export default LogReg