import React, { useContext, useEffect, useRef, useState } from 'react'

import styles from './CSS/MainSVG.module.css'
import { getMousePositionOnSVG, getArrayFromSet } from './Util/general_util'
import { updateCordsForCard, getCardIDList, getCardWithID, updateCardChange } from './Util/cards_util'
import { resizeSVG } from './Util/svg_dim_util'
import { calculateGMatrixForZoom, calculateGMatrixForTranslate } from './Util/gMatrix_util'

import { Line } from './Line'
import { Card } from './Card'

import { LinkChartContextProvider } from './LinkChartCentralProvider'
import { CardUpdateButton } from './CardUpdateButton'

export const MainSVG = ({ wHeight, wWidth }) => {
  const { cards, setCards, activeCard, setActiveCard, svgDim, setSvgDim, gMatrix, setGMatrix, setUpdatedCards } = useContext(LinkChartContextProvider)
  
  const svgContainerRef = useRef(null)

  useEffect(()=>{
    resizeSVG(svgContainerRef,setSvgDim)
  },[wHeight,wWidth,setSvgDim])
  
  //draggable info
  const [draggableState,setDraggableState] = useState({
    draggble: false,
    draggableElementId : -1,
    xdif:-1,
    ydif:-1,
    ctm : null
  })

  //used to get mouse cords translation to SVG cords
  const svg = useRef(null)

  //start drag
  const startDragging = (card_id,event)=>{
    setDraggableState((prev)=>{
      const {x,y} = getMousePositionOnSVG(event,svg.current)

      return {
        ...prev,
        draggble:true,
        draggableElementId:card_id,
        xdif : x - cards[card_id].x,
        ydif : y - cards[card_id].y
      }
    }
    )
  }

  //perform drag if possible
  const tryDragging = (e)=>{
    e.preventDefault()

    //card move
    if(draggableState.draggble && draggableState.draggableElementId!==-1){
      const {x,y} = getMousePositionOnSVG(e,svg.current)
      updateCardChange(draggableState.draggableElementId,setUpdatedCards)
      updateCordsForCard(draggableState.draggableElementId,x - draggableState.xdif,y - draggableState.ydif,setCards)
    }

    //Panning
    if(draggableState.draggble && draggableState.draggableElementId===-1){
      const {x,y} = getMousePositionOnSVG(e,draggableState.anchorSVGProxy)
      let proxyCTM = draggableState.anchorSVGProxy.getScreenCTM()
      const yOffset = svgContainerRef.current.getBoundingClientRect().y
      calculateGMatrixForTranslate(x,y,draggableState.xdif,draggableState.ydif,proxyCTM,setGMatrix,yOffset)
    }

  }

  //stop dragging
  const stopDragging = (e)=>{
    setDraggableState(prev=>(
      {
        ...prev,
        draggble:false
      }
    ))
  }

  const zoom = (e)=>{
    const {x,y} = getMousePositionOnSVG(e,svg.current)
    const zoomOut = e.deltaY>0?true:false

    calculateGMatrixForZoom(x,y,zoomOut,svg,setGMatrix)
  }

  const translate = (e)=>{
    
    setDraggableState((prev)=>{
      const {x,y} = getMousePositionOnSVG(e,svg.current)
      let temp = svg.current.getScreenCTM()
  
      return {
        ...prev,
        draggble:true,
        draggableElementId:-1,
        xdif : x,
        ydif : y,
        anchorSVGProxy : {
            getScreenCTM : ()=> {
              return temp
            }
        }
      }
    })
  }

  return (
    <div ref={svgContainerRef} className={styles.container}>
      <CardUpdateButton/>
      <svg 
        className={styles.SVGMain} height={svgDim.height} width={svgDim.width} 
        onDoubleClick = {(e)=>{ 
          if(activeCard==="-1") return
          setActiveCard("-1")
         }}
        onMouseDown={translate}
        onMouseMove={tryDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onWheel={zoom}
      >
        <g ref={svg} transform={`matrix(${gMatrix.join(" ")})`}>
          {
            getCardIDList(cards).map((card_id)=>{
              const card = getCardWithID(card_id,cards)
              
              if(!card.parent_of){
                return null
              }
              
              let childern_count = card.parent_of.size
              childern_count += childern_count%2===0?0:1

              return getArrayFromSet(card.parent_of).map((child_id,i) => {
                const child_card = getCardWithID(child_id,cards)

                const offset = (i - childern_count/2)+1
                console.log(childern_count,offset)
                
                return <Line 
                          key={`${card_id}_${child_id}`} 
                          x1={card.x + (offset*10)} 
                          y1={card.y} 
                          x2={child_card.x} 
                          y2={child_card.y}/>
              })
            })
          }
          
          {
            getCardIDList(cards).map((card_id)=>{
              const card = getCardWithID(card_id,cards)
              return <Card 
                key={card_id} 
                x={card.x} 
                y={card.y} 
                title={card.title} 
                description={card.description}
                card_id={card_id} 
                startDragging={startDragging}/>
            })
          }
        
        </g>
      </svg>
    </div>
  )
}