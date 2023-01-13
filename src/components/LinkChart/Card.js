import React,{ useContext } from 'react'

import anchor from './Media/anchor.png'

import styles from './CSS/Card.module.css'

import { ActiveCardProvider } from './LineChartContainer'

export const Card = ({x,y,title,description,idx,upsertStartDragging}) => {
  const { setActiveCard,linkExistingCard } = useContext(ActiveCardProvider)

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
    <foreignObject  
      height="100" width= "200" 
      onMouseDown={startDragging} 
      onDoubleClick={handleClick}
      onDrop={(e)=>{
        const parent = e.dataTransfer.getData('parentNode')
        linkExistingCard(parent,idx)
        e.preventDefault()
      }}
      onDragOver={(e)=>{e.preventDefault()}}
      >
            <div className={styles.card}
              
            >
              <div className={styles.cardPadding}>
                <p className={styles.title}>{title}</p>
              </div>
              <div className={styles.cardPadding}>
                <p className={styles.description}>{description}</p>
              </div>
              <div className={styles.anchorPadding}>
                <img src={anchor} alt="anchor"  draggable="true" 
                 onMouseDown={(e)=>{e.stopPropagation()}} 
                 onMouseMove={(e)=>{e.stopPropagation()}}
                 onDragStart={(e)=>{e.dataTransfer.setData('parentNode',idx)}}
                  />
              </div>
            </div>
    </foreignObject>
    </g>
  )
}