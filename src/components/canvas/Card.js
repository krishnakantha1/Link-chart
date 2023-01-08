import React from 'react'



export const Card = ({x,y,text,idx,upsertStartDragging}) => {
    const startDragging = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        
        upsertStartDragging(idx,e)

    }

  return (
    <g transform={`translate(${x},${y})`}>
    <foreignObject  height="60" width= "200" onMouseDown={startDragging}>
            <div style={{
              backgroundColor:"rgb(177, 177, 177)",
              width:"100%",
              height:"100%"
            }}>
              <p>{text}</p>
            </div>
    </foreignObject>
    </g>
  )
}