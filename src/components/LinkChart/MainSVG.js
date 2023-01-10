import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card } from './Card'

import styles from "./CSS/MainSVG.module.css"
import { Line } from './Line'

import { ActiveCardProvider } from './LineChartContainer'

const getMousePositionOnSVG = (e,svg)=>{
  const ctm = svg.getScreenCTM()
  return {
    x : (e.clientX - ctm.e)/ctm.a,
    y : (e.clientY - ctm.f)/ctm.d
  }
}

export const MainSVG = ({ wHeight, wWidth, cards, setCards, svgDim, setSvgDim, gMatrix, setGMatrix }) => {

  const { activeCard,setActiveCard } = useContext(ActiveCardProvider)
  
  const svgContainerRef = useRef(null)

  useEffect(()=>{

    const {width,height}  = svgContainerRef.current.getBoundingClientRect()
    setSvgDim({width,height})

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
  const f = (idx,event)=>{

    setDraggableState((prev)=>{
      const {x,y} = getMousePositionOnSVG(event,svg.current)

      return {
        ...prev,
        draggble:true,
        draggableElementId:idx,
        xdif : x - cards[idx].x,
        ydif : y - cards[idx].y
      }
    }
    )
  }

  //perform drag if possible
  const tryDragging = (e)=>{
    e.preventDefault()

    //card move
    if(draggableState.draggble && draggableState.draggableElementId!==-1){
      setCards(prev=>{
        const {x,y} = getMousePositionOnSVG(e,svg.current)

        const tempCards = [...prev]
        tempCards[draggableState.draggableElementId].x = x - draggableState.xdif
        tempCards[draggableState.draggableElementId].y = y - draggableState.ydif

        return tempCards
      })
    }

    //Panning
    if(draggableState.draggble && draggableState.draggableElementId===-1){
      setGMatrix((prev)=>{
        const {x,y} = getMousePositionOnSVG(e,draggableState.anchorSVGProxy)
        let proxyCTM = draggableState.anchorSVGProxy.getScreenCTM()
    
        const newMat = [...prev]
         newMat[4] = proxyCTM.e + (x - draggableState.xdif)*proxyCTM.a
         newMat[5] = proxyCTM.f + (y - draggableState.ydif)*proxyCTM.d
        return newMat
      })
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

    setGMatrix((prev)=>{

      const newMat = [...prev]
      const zoomOut = e.deltaY>0?true:false

      if(zoomOut && newMat[0]<0.2){
        return newMat
      }else if(!zoomOut && newMat[0]>2.5){
        return newMat
      }

      const zoom =  Math.pow(1 + 0.75, -1 * zoomOut?-0.3:0.3)

      const prevCTM = svg.current.getCTM()
      const {x,y} = getMousePositionOnSVG(e,svg.current)
      const domPoint = new DOMPoint(e.clientX,e.clientY)
      domPoint.matrixTransform(prevCTM.inverse())

      const template = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix()
                                  .translate(x,y)
                                  .scale(zoom)
                                  .translate(-x,-y)
      
      const curCTM = prevCTM.multiply(template)

      newMat[0] = curCTM.a
      newMat[1] = curCTM.b
      newMat[2] = curCTM.c
      newMat[3] = curCTM.d
      newMat[4] = curCTM.e
      newMat[5] = curCTM.f
      return newMat
    })
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
      <svg 
        className={styles.SVGMain} height={svgDim.height} width={svgDim.width} 
        onDoubleClick = {(e)=>{ 
          if(activeCard===-1) return
          setActiveCard(-1)
         }}
        onMouseDown={translate}
        onMouseMove={tryDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onWheel={zoom}
      >
        <g ref={svg} transform={`matrix(${gMatrix.join(" ")})`}>
          {
            cards.map((card,_,card_self)=>{
              if(!card.linkTo){
                return null
              }
              return card.linkTo.map((linkID,_,link_self) => (
                <Line key={Math.random()} x1={card.x} y1={card.y} x2={card_self[linkID].x} y2={card_self[linkID].y}/>
              ))
            })
          }
          
          {
            cards.map((card,i)=>(
              <Card 
                key={i} 
                x={card.x} 
                y={card.y} 
                title={card.title} 
                description={card.description}
                idx={i} 
                upsertStartDragging={f}/>
            ))
          }
        
        </g>
      </svg>
    </div>
  )
}