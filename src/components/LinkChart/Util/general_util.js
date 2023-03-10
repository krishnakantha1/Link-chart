/*
    Has all generic helper functions.
*/

export const isNullOrUndefined = (val)=>{  
    if(val===null || val===undefined) return true
    return false
}

export const getMousePositionOnSVG = (e,svg)=>{
    //touch adapter
    if(e.touches){
        e.clientX = e.touches[0].pageX
        e.clientY = e.touches[0].pageY
    }

    const ctm = svg.getScreenCTM()
    return {
      x : (e.clientX - ctm.e)/ctm.a,
      y : (e.clientY - ctm.f)/ctm.d 
    }
}

export const makePath = (x1,y1,x2,y2)=>{

    let xa1,ya1,xa2,ya2
    xa1 = x1
    ya1 = (y1+y2)/2
    xa2 = x2
    ya2 = ya1

    let cx,cy
    if(Math.abs(y2-ya2)>50){
        cx = x2
        if(y2<ya2){
            cy = y2+50
        }else{
            cy = y2-50
        }
    }else{
        cy = ya2
        if(x2<xa1){
            cx = x2+100
        }else{
            cx = x2-100
        }
    }

    return [{x : x1, y : y1},
            {x : xa1, y : ya1},
            {x : xa2, y : ya2},
            {x : x2, y : y2},
            {x : cx, y : cy}]
}

export const createID = ()=>{
    const arr = []
    const str = 'abcdefghijklmnopqrstuvwxyz123456790'
    for(let i=0;i<str.length;i++){
        arr.push(str[Math.floor(Math.random()*(str.length-1))])
    }

    return arr.join("")
}

export const getArrayFromSet = (set)=>{
    return Array.from(set)
}