import React from 'react'

import styles from './CSS/Controller.module.css'

export const Controller = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Create A Card</h1>
      </div>
      <form className={styles.controllerForm}>
        <div className={styles.inputText}>
          <input type="text" required></input>
          <div className={styles.labelHolder}>
            <label>Title</label>
          </div>
        </div>
        <div className={styles.inputText}>
          <textarea type="text" required></textarea>
          <div className={styles.labelHolder}>
            <label>Description</label>
          </div>
        </div>
        <div className={styles.inputButtonRight}>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}
