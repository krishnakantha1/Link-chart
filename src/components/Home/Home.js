import React from 'react'

import styles from './CSS/Home.module.css'
import chart from './Media/g7442.png'
import shape from './Media/layered-waves.svg'

function Home() {
  return (
    <div className={styles.container}>
        <div className={styles.shape} style={{backgroundImage:`url(${shape})`}}></div>
        <div className={`${styles.content} ${styles.text}`}>
            <h1>Planit</h1>
            <p>Planning just got easy with Planit where you can create link charts and visualize your plan with heirarchal charts.</p>
        </div>
        <div className={`${styles.content} ${styles.image}`}>
          <img src={chart} alt="chart"/>
        </div>
    </div>
  )
}

export default Home