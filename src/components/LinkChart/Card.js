import React,{ useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import link from './Media/link.png'

import styles from './CSS/Card.module.css'
import { checkLinkValidity, linkTwoCreatedCards } from './Util/cards_util'

import { LinkChartContextProvider } from './LinkChartCentralProvider'
import { host, createLink } from '../../constants'
import { UserCredentialContextProvider } from '../UserCredentialProvider/UserCredentialProvider'


export const Card = ({x,y,title,description,card_id,startDragging}) => {
  const { cards, setCards, setActiveCard } = useContext(LinkChartContextProvider)
  const { user_jwt } = useContext(UserCredentialContextProvider).userDetails
  const { chart_id } = useParams()

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

    const handleOnDrop = async (e)=>{
        const parent_id = e.dataTransfer.getData('parent_id')

        if(!checkLinkValidity(parent_id,card_id,cards)){
          console.log("cycle detected. not going to create a link.")
          return
        }

        const resp = await axios({
          method : "POST",
          url : `${host}${createLink}`,
          headers : "application/json",
          data : {
            jwt : user_jwt,
            chartid : chart_id,
            parentid : parent_id,
            childid : card_id
          }
        })

        const { error, message } = resp.data

        if(error){
          console.log(message)
        }else{
          linkTwoCreatedCards(parent_id,card_id,cards,setCards)
        }
        
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