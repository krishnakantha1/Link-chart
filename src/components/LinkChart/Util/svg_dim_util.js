/*
    Has all required functions for modifing state svgDim in LinkCharCentralProvider Component.
*/


/*
    used to resise svgDim react state, which in turn determins the height and width of the SVG.

    svgContainerRef : react ref to <div> element containing the SVG
    setSvgDim : react state setter
*/
export const resizeSVG = (svgContainerRef,setSvgDim)=>{
    const {width,height}  = svgContainerRef.current.getBoundingClientRect()
    setSvgDim({width,height})
}