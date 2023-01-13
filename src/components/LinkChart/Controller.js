import React, { useContext, useState } from 'react'

import styles from './CSS/Controller.module.css'
import { createCard, createChildCard, getCardWithID } from './Util/cards_util'
import { createID, getArrayFromSet } from './Util/general_util'

import { LinkChartContextProvider } from './LinkChartCentralProvider'

const initialCardDetails = {title:'',description:''}

//main controller
export const Controller = () => {
  const { activeCard } = useContext(LinkChartContextProvider)

  return (
    <div className={styles.container}>
      <div>
        <h1>{activeCard==="-1"?"Create A Card":"Card Details"}</h1>
      </div>
      {activeCard==="-1" && (<CreateNewCard />)}
      {activeCard!=="-1" && (<CardInfo card_id={activeCard}/>)}
    </div>
  )
}

//wrapper to create a new card
const CreateNewCard = ()=>{
  const { setCards, svgDim, gMatrix } = useContext(LinkChartContextProvider)

  const [cardDetail,setCardDetail] = useState(initialCardDetails)
  //create card form event handlers
  const handleChange = (e)=>{
    setCardDetail((prev)=>{
      return {...prev,[e.target.id]:e.target.value}
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(cardDetail.title==='' || cardDetail.description==='') return

    const cx = ((svgDim.width)/2 - gMatrix[4])/gMatrix[0]
    const cy = ((svgDim.height)/2 - gMatrix[5])/gMatrix[3]
    createCard(createID(),cardDetail.title,cardDetail.description,cx,cy,setCards)
    setCardDetail(initialCardDetails)
  }

  return (
    <CreateCardForm createSubCard={false} handleChange={handleChange} handleSubmit={handleSubmit} cardDetail={cardDetail}/>
  )
}

//display extended card info for card with inedx idx
const CardInfo = ({ card_id })=>{
  const { cards,setCards, svgDim, gMatrix } = useContext(LinkChartContextProvider)

  const [cardDetail,setCardDetail] = useState(initialCardDetails)

  //create card form event handlers
  const handleChange = (e)=>{
    setCardDetail((prev)=>{
      return {...prev,[e.target.id]:e.target.value}
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(cardDetail.title==='' || cardDetail.description==='') return

    const cx = ((svgDim.width)/2 - gMatrix[4])/gMatrix[0]
    const cy = ((svgDim.height)/2 - gMatrix[5])/gMatrix[3]
    createChildCard(card_id,createID(),cardDetail.title,cardDetail.description,cx,cy,setCards)
    setCardDetail(initialCardDetails)
  }


  return (
    <div>
      <SimpleCard card_id={card_id}/>
      <div className={styles.cardInfoPrompt}> 
        <p>Create a linking card</p>
      </div>
      <CreateCardForm createSubCard={true} handleChange={handleChange} handleSubmit={handleSubmit} cardDetail={cardDetail}/>
      <div className={styles.cardInfoPrompt}> 
        <p>Linked To current card</p>
      </div>
      {
        getArrayFromSet(getCardWithID(card_id,cards).parent_of).map((child_id)=>(
          <SimpleCard key={child_id} card_id={child_id}/>
        ))
      }
    </div>
  )
}

//display barebones card info for card with index idx
const SimpleCard = ({ card_id })=>{
    const { cards } = useContext(LinkChartContextProvider)
    const card = getCardWithID(card_id,cards)

    return (
      <div className={styles.cardContainer}>
        <div className={styles.cardPadding}>
          <p className={styles.title}>{card.title}</p>
        </div>
        <div className={styles.cardPadding}>
          <p className={styles.description}>{card.description}</p>
        </div>
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
