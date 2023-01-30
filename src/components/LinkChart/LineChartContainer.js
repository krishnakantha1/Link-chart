import React, { createContext } from 'react'

import styles from './CSS/LineChartContainer.module.css'

import { LinkChartCentralProvider } from './LinkChartCentralProvider'
import { MainSVG } from './MainSVG'
import { Controller } from './Controller'

export const ActiveCardProvider = createContext()

const LineChartContainer = ( {wHeight,wWidth} ) => {
  

  return (
    <div className={styles.container}>
      <LinkChartCentralProvider>
          <MainSVG 
            wHeight={wHeight} 
            wWidth={wWidth} />
          <Controller/>
      </LinkChartCentralProvider>
    </div>
    
  )
}

export default LineChartContainer
