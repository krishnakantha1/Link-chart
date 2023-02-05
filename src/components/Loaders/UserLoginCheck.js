import React from 'react'

import styles from './CSS/UserLoginCheck.module.css'

export const UserLoginCheck = ({ render, condition, promptForFalse }) => {
  return (
    <>
    {    condition ?
        render()
        :
        <div className={styles.container}>
            <h1>{promptForFalse}</h1>
        </div>
    }
    </>
  )
}
