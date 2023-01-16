import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import "./App.css"

import { UserCredentialProvider } from './components/UserCredentialProvider/UserCredentialProvider'
import { LineChartContainer } from './components/LinkChart/LineChartContainer'
import { LinkChartList } from './components/LinkChartList/LinkChartList';
import { Nav } from './components/Nav/Nav';

const App = ()=>{
  const [windowDim,setWindowDim] = useState([window.innerHeight,window.innerWidth]);

  useEffect(()=>{
    
    window.addEventListener('resize',()=>{
      setWindowDim([window.innerHeight,window.innerWidth])
    })
  },[])

  return (
    <UserCredentialProvider>
      <Nav/>
      <Routes>
        <Route path='/linkchart' element={<LinkChartList/>}/>
        <Route path='/linkchart/:chart_id' element={<LineChartContainer wHeight={windowDim[0]} wWidth={windowDim[1]}/>}/>
      </Routes>
    </UserCredentialProvider>
  )
}
//813405-d45113-f9a03f-f8dda4-ddf9c1
export default App