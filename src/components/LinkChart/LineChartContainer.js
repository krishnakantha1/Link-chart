import React, { createContext, useRef } from 'react'

import styles from './CSS/LineChartContainer.module.css'

import { LinkChartCentralProvider } from './LinkChartCentralProvider'
import { MainSVG } from './MainSVG'
import { Controller } from './Controller'

export const ActiveCardProvider = createContext()

const LineChartContainer = () => {
  const svgContainerRef = useRef()

  return (
    <div className={styles.container}>
      <LinkChartCentralProvider>
          <MainSVG 
            ref={svgContainerRef} />
          <Controller svgDim={svgContainerRef}/>
      </LinkChartCentralProvider>
    </div>
    
  )
}

export default LineChartContainer
