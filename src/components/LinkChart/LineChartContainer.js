import React, { useState,createContext } from 'react'

import styles from './CSS/LineChartContainer.module.css'

import { MainSVG } from './MainSVG'
import { Controller } from './Controller'

/*card {
  id : string
  x : number
  y : number
  title : string
  description : string
  linkTo : [index]
}*/

export const ActiveCardProvider = createContext()

export const LineChartContainer = ( {wHeight,wWidth} ) => {
  //cards to be displayed in the svg
  const [cards,setCards] = useState([])

  //svg dimension data and calculations
  const [svgDim,setSvgDim] = useState({height : 0, width : 0})
  const [gMatrix, setGMatrix] = useState([1,0,0,1,0,0])

  //active selected card
  const [activeCard,setActiveCard] = useState(-1)

  const linkExistingCard = (parent,child)=>{
    setCards(prev=>{
      const newCards = [...prev]

      newCards[parent].linkTo = [child,...newCards[parent].linkTo]

      return newCards
    })
  }
  

  const createNewCard = (title,description,idx)=>{
    setCards(prev=>{
      const newCards = [...prev] 
      const cx = ((svgDim.width)/2 - gMatrix[4])/gMatrix[0]
      const cy = ((svgDim.height)/2 - gMatrix[5])/gMatrix[3]
      const newCardTemplate = { title, description, x : cx, y : cy, id : Math.random(), linkTo : [] }
      
      if( idx !== undefined && idx!==null ){
        newCards[idx].linkTo = [newCards.length, ...newCards[idx].linkTo]
      }

      newCards.push(newCardTemplate)
      return newCards
    })
  }

  return (
    <div className={styles.container}>
      <ActiveCardProvider.Provider value={{activeCard,setActiveCard,cards,setCards,
      linkExistingCard}}>
        <MainSVG 
          wHeight={wHeight} 
          wWidth={wWidth} 
          cards={cards} 
          setCards={setCards} 
          svgDim={svgDim} 
          setSvgDim={setSvgDim}
          gMatrix={gMatrix}
          setGMatrix={setGMatrix}/>
        <Controller createNewCard={createNewCard}/>
      </ActiveCardProvider.Provider>
    </div>
    
  )
}
