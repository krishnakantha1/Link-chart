/*
    Has all required functions for modifing state gMatrix in LinkCharCentralProvider Component.
*/

/*
    used to canculate new CTM for Zooming.

    x : number //current mouse x on the svg coordinates 
    y : number //current mouse y on the svg coordinates
    zoomOut : boolean //true - zoom out, false - zoom in
    svg : react ref to <svg> element
    setGMatrix : react state setter
*/
export const calculateGMatrixForZoom = (x,y,zoomOut,svg,setGMatrix)=>{
    setGMatrix((prev)=>{
        const newMat = [...prev]
        
        if(zoomOut && newMat[0]<0.2){
          return newMat
        }else if(!zoomOut && newMat[0]>2.5){
          return newMat
        }
  
        const zoom =  Math.pow(1 + 0.75, -1 * zoomOut?-0.3:0.3)
  
        const prevCTM = svg.current.getCTM()
        
        const domPoint = new DOMPoint(x,y)
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

/*
    used to canculate new CTM for translation/Panning.

    x : number //current mouse x on the svg coordinates 
    y : number //current mouse y on the svg coordinates
    xdif : number //mouse x on the svg coordinates at the start of the Pan
    ydif : number //mouse y on the svg coordinates at the start of the Pan
    proxyCTM : CTM // [a,b,c,d,e,f] representing the CTM at the start of the Pan
    setGMatrix : react state setter
*/
export const calculateGMatrixForTranslate = (x,y,xdif,ydif,proxyCTM,setGMatrix,yOffset)=>{
    setGMatrix((prev)=>{
        const newMat = [...prev]
         newMat[4] = proxyCTM.e + (x - xdif)*proxyCTM.a
         newMat[5] = proxyCTM.f + (y - ydif)*proxyCTM.d - yOffset
        return newMat
      })
}