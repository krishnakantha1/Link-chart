import React, { useEffect, useState } from 'react'

import "./App.css"

import { LineChartContainer } from './components/LinkChart/LineChartContainer'

const App = ()=>{
  const [windowDim,setWindowDim] = useState([window.innerHeight,window.innerWidth]);

  useEffect(()=>{
    
    window.addEventListener('resize',()=>{
      setWindowDim([window.innerHeight,window.innerWidth])
    })
  },[])

  return (
    <LineChartContainer wHeight={windowDim[0]} wWidth={windowDim[1]}/>
  )
}
//813405-d45113-f9a03f-f8dda4-ddf9c1
export default App