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

const createSVGState = ()=>{
  let c1x = Math.random()*200
  let c1y = Math.random()*200
  let c1text = "card 1"

  let c2x = Math.random()*200
  let c2y = Math.random()*200
  let c2text = "card 2"
  
  return [
          {id:Math.random(),x:c1x,y:c1y,title:c1text,description:'des1',linkTo:[1]},
          {id:Math.random(),x:c2x,y:c2y,title:c2text,description:'des2',linkTo:[]}]
}

export const LineChartContainer = ( {wHeight,wWidth} ) => {
  //cards to be displayed in the svg
  const [cards,setCards] = useState(createSVGState())

  //svg dimension data and calculations
  const [svgDim,setSvgDim] = useState({height : 0, width : 0})
  const [gMatrix, setGMatrix] = useState([1,0,0,1,0,0])

  //active selected card
  const [activeCard,setActiveCard] = useState(-1)
  

  const createNewCard = (title,description,idx)=>{
    
    setCards(prev=>{
      const newCards = [...prev] 
      const cx = ((svgDim.width)/2 - gMatrix[4])/gMatrix[0]
      const cy = ((svgDim.height)/2 - gMatrix[5])/gMatrix[3]
      const newCardTemplate = { title, description, x : cx, y : cy, id : Math.random(), linkTo : [] }
      
      if(idx){
        newCards[idx].linkTo = [newCards.length, ...newCards[idx].linkTo]
      }

      newCards.push(newCardTemplate)
      return newCards
    })
  }

  return (
    <div className={styles.container}>
      <ActiveCardProvider.Provider value={{activeCard,setActiveCard,cards,setCards}}>
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
