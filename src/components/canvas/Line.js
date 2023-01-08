import React from 'react'

const makePath = (x1,y1,x2,y2)=>{

    if(x1>x2){
        let t1 = x1
        let t2 = y1
        x1 = x2
        y1 = y2
        x2 = t1
        y2 = t2
    }

    let xa1,ya1,xa2,ya2
    //downward slop
    if(y1>y2){
        xa1 = x1
        ya1 = (y1+y2)/2
        xa2 = x2
        ya2 = ya1
    }else{
        xa1 = x1
        ya1 = (y2+y1)/2
        xa2 = x2
        ya2 = ya1
    }

    return [{x : x1,y : y1},
            {x : xa1,y : ya1},
            {x : xa2,y : ya2},
            {x : x2,y : y2}]
}

export const Line = ({x1,y1,x2,y2}) => {
    const a = makePath(x1+100,y1+30,x2+100,y2+30)
  return (
    <g>
        
        <path 
        stroke="grey" strokeWidth="3"
        d={`
            M ${a[0].x},${a[0].y}
            L ${a[1].x},${a[1].y}
            L ${a[2].x},${a[2].y}
            L ${a[3].x},${a[3].y}
        `}/>
    </g>
  )
}
