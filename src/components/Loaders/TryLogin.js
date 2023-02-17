import React from 'react'

import { LoadingAnimation1 } from "./LoadingAnimation1"
import styles from "./CSS/TryLogin.module.css"

export const TryLogin = ()=> {
  return (
    <div className={styles.container}>
        <h1>Trying To Log In...</h1>
        <div className={styles.progressContainer}>
            <LoadingAnimation1/>
        </div>
    </div>
  )
}
