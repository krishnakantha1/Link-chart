import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import deleteIcon from './Media/delete.png'
import styles from './CSS/LinkChartList.module.css'

export const LinkChartList = () => {
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
    setUserCharts([{
      chart_id : 1,
      chart_name : "my chart 1"
    },
    {
      chart_id: 2,
      chart_name : "my chart 2"
    }])
  },[])

  const deleteChart = (chart_id)=>{
    setUserCharts(prev=>{
      const newCharts = [...prev]

      const idx = newCharts.findIndex((chart)=>(chart.chart_id===chart_id))

      newCharts.splice(idx,1)

      return newCharts
    })
  }

  return (
    <div className={styles.container}>
      {
        userCharts.map(({chart_id,chart_name})=>(
          <ChartListItem key={chart_id} chart_id={chart_id} chart_name={chart_name} deleteChart={deleteChart}/>
        ))
      }
    </div>
  )
}

const ChartListItem = ({chart_id, chart_name, deleteChart})=>{
  const navigate = useNavigate()

  const handleClick = useCallback(()=>{
    navigate(`/linkchart/${chart_id}`)
  },[navigate,chart_id])

  const handleDelete = (e)=>{
    e.stopPropagation()
    deleteChart(chart_id)
  }

  return (
    <div className={styles.itemContainer} onClick={handleClick}>
      <p>{chart_name}</p>
      <button onClick={handleDelete}>
        <img src={deleteIcon} alt="delete" title="delete chart"/>
      </button>
    </div>
    )
}
