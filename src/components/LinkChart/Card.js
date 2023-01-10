import React from 'react'

import styles from './CSS/Card.module.css'



export const Card = ({x,y,text,idx,upsertStartDragging}) => {
    const startDragging = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        
        upsertStartDragging(idx,e)

    }

  return (
    <g transform={`translate(${x},${y})`}>
    <foreignObject  height="100" width= "200" onMouseDown={startDragging}>
            <div className={styles.card}>
              
            </div>
    </foreignObject>
    </g>
  )
}