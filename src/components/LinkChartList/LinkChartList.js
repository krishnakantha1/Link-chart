import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { host, getUserCharts, createChart, deleteChart as dc } from '../../constants'
import deleteIcon from './Media/delete.png'
import styles from './CSS/LinkChartList.module.css'
import { UserCredentialContextProvider } from '../UserCredentialProvider/UserCredentialProvider'


const LinkChartList = () => {
  const { user_jwt } = useContext(UserCredentialContextProvider).userDetails
  const navigate = useNavigate()
  const goto = useCallback((id)=>{
    navigate(`/linkchart/${id}`)
  },[navigate])

  const [chartData,setChartData] = useState("")

  const handleChange = (e)=>{
    setChartData(e.target.value)
  }

  const handleFormSubmit = async (e)=>{
    e.preventDefault()

    if(chartData.length===0) return

    try{
      const resp = await axios({
        method : "POST",
        url :  `${host}${createChart}`,
        headers : "application/json",
        data : {
          jwt : user_jwt,
          chartname : chartData
        }
      })

      const { error } = resp.data
      if(error){
        console.log(resp.data.message)
      }else{
        const { chartid } = resp.data
        goto(chartid)
      }
    }catch(e){
      console.log(e)
    }

  }

  /*
    [
      {
        chart_id : string
        chart_name : string
        chart_creation_date : datetime
      }
    ]
  */
  const [userCharts,setUserCharts] = useState([])

  useEffect(()=>{
     const fetchData = async ()=>{
      try{
        const resp = await axios({
          method : "post",
          url : `${host}${getUserCharts}`,
          headers : "application/json",
          data : {
            jwt : user_jwt
          }
        })

        const { data : { error } } = resp

        if(error){
          console.log(resp.data.message)
        }else{
          const { data : { data } } = resp
          setUserCharts(data)
        }
        
      }catch(e){
        console.log(e)
      }
     }
     fetchData()
  },[user_jwt])

  const deleteChart = async (chart_id)=>{

    if(!chart_id) return

    try{
      const resp = await axios({
        method:  "DELETE",
        url : `${host}${dc}`,
        headers : "application/json",
        data: {
          chartid : chart_id,
          jwt : user_jwt
        }
      })

      const { data : { error } } = resp

      if(error){
        console.log(resp.data.message)
      }else{
        const { data : { chartid } } = resp
        console.log(resp)
        setUserCharts(prev=>{
          const newCharts = [...prev]
    
          const idx = newCharts.findIndex((chart)=>(chart.chart_id===chartid))
    
          newCharts.splice(idx,1)
    
          return newCharts
        })
      }
      
    }catch(e){
      console.log(e)
    }

    
  }

  return (
    <div className={styles.container}>
      <div className={styles.createChartContainer}>
        <form onSubmit={handleFormSubmit}>
          <label>Create A New Chart</label>
          <input type="text" value={chartData} onChange={handleChange} placeholder="Chart Name"/>
          <button>Create</button>
        </form>
      </div>
      <div className={styles.myChartList}>
        <div>
          <h1>
            My Charts
          </h1>
        </div>
        <div className={styles.chartList}>
          {
            userCharts.map(({chart_id,chart_name,chart_creation_date})=>(
              <ChartListItem 
                key={chart_id} 
                chart_id={chart_id} 
                chart_name={chart_name} 
                deleteChart={deleteChart} 
                chart_creation_date={chart_creation_date}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

const ChartListItem = ({chart_id, chart_name, deleteChart, chart_creation_date})=>{
  const navigate = useNavigate()

  const handleClick = useCallback(()=>{
    navigate(`/linkchart/${chart_id}`)
  },[navigate,chart_id])

  const handleDelete = (e)=>{
    e.stopPropagation()
    deleteChart(chart_id)
  }

  return (
    <div className={styles.chartItemContainer} onClick={handleClick}>
      <p>{chart_name}</p>
      <div className={styles.content}>
        <p>Created On: {new Date(chart_creation_date).toLocaleDateString()}</p>
      </div>
      <button onClick={handleDelete}>
        <img src={deleteIcon} alt="delete" title="delete chart"/>
      </button>
    </div>
    )
}

export default LinkChartList