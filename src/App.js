import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';

import "./App.css"

import { UserCredentialProvider } from './components/UserCredentialProvider/UserCredentialProvider'


import { Nav } from './components/Nav/Nav';

const LineChartContainer = lazy(()=> import('./components/LinkChart/LineChartContainer'))
const LinkChartList = lazy(()=> import('./components/LinkChartList/LinkChartList')) 
const Home = lazy(()=> import('./components/Home/Home')) 

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
      <Suspense fallback={<div>Loading...........</div>}>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/linkchart' element={<LinkChartList/>}/>
          <Route path='/linkchart/:chart_id' element={<LineChartContainer wHeight={windowDim[0]} wWidth={windowDim[1]}/>}/>
        
      </Routes>
      </Suspense>
    </UserCredentialProvider>
  )
}

export default App