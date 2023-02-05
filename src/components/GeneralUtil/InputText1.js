import React from 'react'

import styles from './CSS/InputText1.module.css'

export const InputText1 = ({ label, value, handleChange, compID, type }) => {
  return (
    <div className={styles.inputText}>
          <input 
            type={type} 
            id={compID} 
            required 
            value={ value } 
            onChange={handleChange}>
          </input>
          <div className={styles.labelHolder}>
            <label>{label}</label>
          </div>
        </div>
  )
}