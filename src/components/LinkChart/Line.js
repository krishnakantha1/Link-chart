import React from 'react'

import { makePath } from './Util/general_util'



export const Line = ({x1,y1,x2,y2}) => {
  const a = makePath(x1+100,y1+50,x2+100,y2+50)
  
  return (
    <g>   
        <path 
        stroke="rgb(249, 160, 63)" strokeWidth="3" fill="none"
        d={`
            M ${a[0].x},${a[0].y}
            L ${a[1].x},${a[1].y}
            L ${a[2].x},${a[2].y}
            L ${a[3].x},${a[3].y}
        `}/>
        <circle cx={a[4].x} cy={a[4].y} r="5" fill="rgb(249, 160, 63)"/>
    </g>
  )
}
