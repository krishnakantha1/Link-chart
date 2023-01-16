import React,{ useContext } from 'react'

import link from './Media/link.png'

import styles from './CSS/Card.module.css'
import { linkTwoCreatedCards } from './Util/cards_util'

import { LinkChartContextProvider } from './LinkChartCentralProvider'

export const Card = ({x,y,title,description,card_id,startDragging}) => {
  const { cards, setCards, setActiveCard } = useContext(LinkChartContextProvider)

    const handleMouseDown = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        
        startDragging(card_id,e)

    }

    const handleDoubleClick = (e)=>{
      e.preventDefault()
      e.stopPropagation()

      setActiveCard(card_id)
    }

    const handleOnDrop = (e)=>{
        const parent_id = e.dataTransfer.getData('parent_id')
        linkTwoCreatedCards(parent_id,card_id,cards,setCards)
        e.preventDefault()
    }

  return (
    <g transform={`translate(${x},${y})`}>
    <foreignObject  
      height="100" width= "200" 
      onMouseDown={handleMouseDown} 
      onDoubleClick={handleDoubleClick}
      onDrop={handleOnDrop}
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
                <img src={link} alt="anchor"  draggable="true" 
                 onMouseDown={(e)=>{e.stopPropagation()}} 
                 onMouseMove={(e)=>{e.stopPropagation()}}
                 onDragStart={(e)=>{e.dataTransfer.setData('parent_id',card_id)}}
                  />
              </div>
            </div>
    </foreignObject>
    </g>
  )
}