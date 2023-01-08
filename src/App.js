import React, { useEffect, useState } from 'react'

import "./App.css"

import MainCanvas from './components/canvas/MainCanvas'

const App = ()=>{
  const [windowDim,setWindowDim] = useState([window.innerHeight,window.innerWidth]);

  useEffect(()=>{
    
    window.addEventListener('resize',()=>{
      setWindowDim([window.innerHeight,window.innerWidth])
    })
  },[])

  return (
    <MainCanvas wHeight={windowDim[0]} wWidth={windowDim[1]}/>
  )
}

export default App