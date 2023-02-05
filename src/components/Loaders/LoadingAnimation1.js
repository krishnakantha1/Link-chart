import React from 'react'

import styles from './CSS/LoadingAnimation1.module.css'

export const LoadingAnimation1 = () => {
  return (
    <div className={styles.temp}>
    <div className={styles.container}>
        <div className={styles.circle} style={{'--i':0}}></div>
        <div className={styles.circle} style={{'--i':1}}></div>
        <div className={styles.circle} style={{'--i':2}}></div>
        <div className={styles.circle} style={{'--i':3}}></div>
    </div>
    </div>
    
  )
}
