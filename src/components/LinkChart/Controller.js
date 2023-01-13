import React, { useContext, useState } from 'react'

import styles from './CSS/Controller.module.css'

import { ActiveCardProvider } from './LineChartContainer'

const initialCardDetails = {title:'',description:''}

//main controller
export const Controller = ( { createNewCard }) => {
  const { activeCard } = useContext(ActiveCardProvider)

  return (
    <div className={styles.container}>
      <div>
        <h1>{activeCard===-1?"Create A Card":"Card Details"}</h1>
      </div>
      {activeCard===-1 && (<CreateNewCard createNewCard={createNewCard}/>)}
      {activeCard!==-1 && (<CardInfo idx={activeCard} createNewCard={createNewCard}/>)}
    </div>
  )
}

//wrapper to create a new card
const CreateNewCard = ({createNewCard})=>{
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

    createNewCard(cardDetail.title,cardDetail.description)
    setCardDetail(initialCardDetails)
  }

  return (
    <CreateCardForm createSubCard={false} handleChange={handleChange} handleSubmit={handleSubmit} cardDetail={cardDetail}/>
  )
}

//display extended card info for card with inedx idx
const CardInfo = ({ idx, createNewCard })=>{
  const { cards } = useContext(ActiveCardProvider)

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

    createNewCard(cardDetail.title,cardDetail.description,idx)
    setCardDetail(initialCardDetails)
  }


  return (
    <div>
      <SimpleCard idx={idx}/>
      <div className={styles.cardInfoPrompt}> 
        <p>Create a linking card</p>
      </div>
      <CreateCardForm createSubCard={true} handleChange={handleChange} handleSubmit={handleSubmit} cardDetail={cardDetail}/>
      <div className={styles.cardInfoPrompt}> 
        <p>Linked To current card</p>
      </div>
      {
        cards[idx].linkTo.map((nextIdx)=>(
          <SimpleCard idx={nextIdx}/>
        ))
      }
    </div>
  )
}

//display barebones card info for card with index idx
const SimpleCard = ({ idx })=>{
    const { cards } = useContext(ActiveCardProvider)

    return (
      <div className={styles.cardContainer}>
        <div className={styles.cardPadding}>
          <p className={styles.title}>{cards[idx].title}</p>
        </div>
        <div className={styles.cardPadding}>
          <p className={styles.description}>{cards[idx].description}</p>
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
