import React,{ useContext } from 'react'

import styles from './CSS/Card.module.css'

import { ActiveCardProvider } from './LineChartContainer'

export const Card = ({x,y,title,description,idx,upsertStartDragging}) => {
  const { setActiveCard } = useContext(ActiveCardProvider)

    const startDragging = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        
        upsertStartDragging(idx,e)

    }

    const handleClick = (e)=>{
      e.preventDefault()
      e.stopPropagation()

      setActiveCard(idx)
    }

  return (
    <g transform={`translate(${x},${y})`}>
    <foreignObject  height="100" width= "200" onMouseDown={startDragging} onDoubleClick={handleClick}>
            <div className={styles.card}>
              <p>{title}</p>
              <p>{description}</p>
            </div>
    </foreignObject>
    </g>
  )
}