import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


import styles from './CSS/Controller.module.css'
import { createCard, createChildCard, getCardWithID, deleteCard, deleteLink, deleteCardChange } from './Util/cards_util'
import {  getArrayFromSet } from './Util/general_util'

import { LinkChartContextProvider } from './LinkChartCentralProvider'
import { host, createCard as cc, deleteCard as dc, deleteLink as dl } from '../../constants'
import { UserCredentialContextProvider } from '../UserCredentialProvider/UserCredentialProvider'

const initialCardDetails = {title:'',description:''}

//main controller
export const Controller = ({ svgDim }) => {
  const { activeCard } = useContext(LinkChartContextProvider)

  return (
    <div className={styles.container}>
      <div>
        <h1>{activeCard==="-1"?"Create A Card":"Card Details"}</h1>
      </div>
      {activeCard==="-1" && (<CreateNewCard svgDim={svgDim} />)}
      {activeCard!=="-1" && (<CardInfo card_id={activeCard} svgDim={svgDim}/>)}
    </div>
  )
}

//wrapper to create a new card
const CreateNewCard = ({ svgDim })=>{
  const { user_jwt } = useContext(UserCredentialContextProvider).userDetails
  const { setCards, gMatrix } = useContext(LinkChartContextProvider)

  const { chart_id } = useParams()

  const [cardDetail,setCardDetail] = useState(initialCardDetails)
  //create card form event handlers
  const handleChange = (e)=>{
    setCardDetail((prev)=>{
      return {...prev,[e.target.id]:e.target.value}
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(cardDetail.title==='' || cardDetail.description==='') return

    const xtemp = svgDim.current.getBoundingClientRect().right - svgDim.current.getBoundingClientRect().left
    const ytemp = svgDim.current.getBoundingClientRect().bottom - svgDim.current.getBoundingClientRect().top

    const cx = ((xtemp)/2 - gMatrix[4])/gMatrix[0]
    const cy = ((ytemp)/2 - gMatrix[5])/gMatrix[3]

    const resp = await axios({
      method : "POST",
      url :  `${host}${cc}`,
      headers : "application/json",
      data : {
        jwt : user_jwt,
        chartid : chart_id,
        title : cardDetail.title,
        description : cardDetail.description,
        x : cx,
        y : cy,
        parent_id : null
      }
    })

    if(resp.data.error){
      console.log(resp.data)
    }else{
      const { cardid } = resp.data
      createCard(cardid,cardDetail.title,cardDetail.description,cx,cy,setCards)
      setCardDetail(initialCardDetails)
    }
    
  }

  return (
    <CreateCardForm createSubCard={false} handleChange={handleChange} handleSubmit={handleSubmit} cardDetail={cardDetail}/>
  )
}

//display extended card info for card with id card_id
const CardInfo = ({ card_id, svgDim })=>{
  const { user_jwt } = useContext(UserCredentialContextProvider).userDetails
  const { cards, setCards, gMatrix, setActiveCard, updatedCards, setUpdatedCards } = useContext(LinkChartContextProvider)
  const { chart_id } = useParams()

  const [cardDetail,setCardDetail] = useState(initialCardDetails)

  //create card form event handlers
  const handleChange = (e)=>{
    setCardDetail((prev)=>{
      return {...prev,[e.target.id]:e.target.value}
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(cardDetail.title==='' || cardDetail.description==='') return

    const xtemp = svgDim.current.getBoundingClientRect().right - svgDim.current.getBoundingClientRect().left
    const ytemp = svgDim.current.getBoundingClientRect().bottom - svgDim.current.getBoundingClientRect().top

    const cx = ((xtemp)/2 - gMatrix[4])/gMatrix[0]
    const cy = ((ytemp)/2 - gMatrix[5])/gMatrix[3]

    const resp = await axios({
      method : "POST",
      url :  `${host}${cc}`,
      headers : "application/json",
      data : {
        jwt : user_jwt,
        chartid : chart_id,
        title : cardDetail.title,
        description : cardDetail.description,
        x : cx,
        y : cy,
        parentid : card_id
      }
    })

    if(resp.data.error){
      console.log(resp.data)
    }else{
      const { cardid } = resp.data
      createChildCard(card_id,cardid,cardDetail.title,cardDetail.description,cx,cy,setCards)
      setCardDetail(initialCardDetails)
    }
  }

  const handleClick = async (e)=>{
    const resp = await axios({
      method : "DELETE",
      url : `${host}${dc}`,
      headers : "application/json",
      data : {
        jwt : user_jwt,
        chartid : chart_id,
        cardid : card_id
      }
    })
    
    const { error,message } = resp.data
    if(error){
      console.log(message)
    }else{
      deleteCard(card_id,setCards)
      deleteCardChange(card_id,updatedCards,setUpdatedCards)
      setActiveCard("-1")
    }
  }
  


  return (
    <div>
      <SimpleCard card_id={card_id}/>
      
      <div className={styles.deleteButtonPadding}>
        <button className={styles.cardDeleteButton} onClick={handleClick}>Delete card</button>
      </div>
      
      <div className={styles.cardInfoPrompt}> 
        <p>Create a linking card</p>
      </div>
      <CreateCardForm createSubCard={true} handleChange={handleChange} handleSubmit={handleSubmit} cardDetail={cardDetail}/>
      <div className={styles.cardInfoPrompt}> 
        <p>Linked To current card</p>
      </div>
      {
        getArrayFromSet(getCardWithID(card_id,cards).parent_of).map((child_id)=>(
          <SimpleCard key={child_id} parent_id={card_id} card_id={child_id} childCard={true}/>
        ))
      }
    </div>
  )
}

//display barebones card info for card with index idx
const SimpleCard = ({ card_id,childCard,parent_id })=>{
    const { user_jwt } = useContext(UserCredentialContextProvider).userDetails
    const { cards, setCards } = useContext(LinkChartContextProvider)
    const { chart_id } = useParams()
    const card = getCardWithID(card_id,cards)


    const handleClick = async (e)=>{

      const resp = await axios({
        method : "DELETE",
        url : `${host}${dl}`,
        headers : "application/json",
        data : {
          chartid : chart_id,
          jwt : user_jwt,
          parentid : parent_id,
          childid : card_id
        }
      })

      const { error, message } = resp.data
      
      if(error){
        console.log(message)
      }else{
        deleteLink(parent_id,card_id,cards,setCards)
      }
    }

    return (
      <div className={styles.cardContainer}>
        <div className={styles.cardPadding}>
          <p className={styles.title}>{card.title}</p>
        </div>
        <div className={styles.cardPadding}>
          <p className={styles.description}>{card.description}</p>
        </div>
        {childCard && <button title='Delete Link' onClick={handleClick}></button>}
      </div>
    )
}




//form to create new Cards
const CreateCardForm = ({ createSubCard, handleChange, handleSubmit, cardDetail})=>{

  return (
    <>
      <form className={styles.controllerForm} onSubmit={handleSubmit} style={{margin: `${createSubCard?"0":"50px"} 0`}}>
        <div className={styles.inputText}>
          <input 
            type="text" 
            id="title" 
            required 
            value={cardDetail.title} 
            onChange={handleChange}>
          </input>
          <div className={styles.labelHolder}>
            <label>Title</label>
          </div>
        </div>
        <div className={styles.inputText}>
          <textarea 
            type="text" 
            id="description" 
            required 
            value={cardDetail.description} 
            onChange={handleChange}>
          </textarea>
          <div className={styles.labelHolder}>
            <label>Description</label>
          </div>
        </div>
        <div className={styles.inputButtonRight}>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  )
}
