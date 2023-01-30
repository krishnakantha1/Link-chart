import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from './CSS/CardUpdateButton.module.css'

import { LinkChartContextProvider } from './LinkChartCentralProvider'
import { getArrayFromSet } from './Util/general_util'
import { host, updateCards } from '../../constants'
import { UserCredentialContextProvider } from '../UserCredentialProvider/UserCredentialProvider'


export const CardUpdateButton = () => {
    const { updatedCards, cards, setUpdatedCards } = useContext(LinkChartContextProvider)
    const { user_jwt } = useContext(UserCredentialContextProvider).userDetails
    const { chart_id } = useParams()

    const handleClick = async (e)=>{
        if(updatedCards.size===0) return
        
        const cardids = getArrayFromSet(updatedCards)
        const xs = []
        const ys = []
    
        for(let i=0;i<cardids.length;i++){
            xs.push(cards[cardids[i]].x)
            ys.push(cards[cardids[i]].y)
        }


        const resp = await axios({
            method : "PUT",
            url : `${host}${updateCards}`,
            headers : "application/json",
            data : {
                chartid : chart_id,
                jwt : user_jwt,
                cardids,
                xs,
                ys,
            }
        })

        const { error, message, count } = resp.data
        if(error){
            console.log(message)
        }else{
            console.log(count)
            setUpdatedCards(new Set())
        }
    }

  return (
    <div className={styles.buttonConatiner}>
        <button className={`${styles.button} ${updatedCards.size >0 ?styles.activate : null}`} 
                onClick={handleClick}>Save</button>
    </div>
  )
}
