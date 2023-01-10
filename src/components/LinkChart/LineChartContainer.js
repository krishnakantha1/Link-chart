import React from 'react'

import styles from './CSS/LineChartContainer.module.css'

import { MainSVG } from './MainSVG'
import { Controller } from './Controller'

export const LineChartContainer = ( {wHeight,wWidth} ) => {
  return (
    <div className={styles.container}>
      <MainSVG wHeight={wHeight} wWidth={wWidth}/>
      <Controller/>
    </div>
    
  )
}
