import React,{ useState,createContext, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { host, getCards } from '../../constants'
import { UserCredentialContextProvider } from '../UserCredentialProvider/UserCredentialProvider'
import { formatCardData } from './Util/cards_util'


export const LinkChartContextProvider = createContext(null)
/*card {
  id : string
  x : number
  y : number
  title : string
  description : string
  linkTo : [index]
}*/

export const LinkChartCentralProvider = ({children}) => {
    const { user_jwt } = useContext(UserCredentialContextProvider).userDetails
    const { chart_id } = useParams()

    //cards to be displayed in the svg
    /*  CARDS STRUCTURE : object
        {
            card_id : {
                card_id : card_id (string),
                x : [number]
                y : [number]
                title : [string]
                description : [srting]
                Parent_of : [Set of card_id]
                Child_of : [set of card_id]
            }
        }
    */
    const [cards,setCards] = useState({})

    /*
        group transform parameter [a,b,c,d,e,f] 
        where a,d for scaling : used for zooming
        where e,f for translating : used for paning

        initialy scaled to 1 and not translated
    */
    const [gMatrix, setGMatrix] = useState([1,0,0,1,0,0])

    /* active selected card
        values : "-1" -> no card selected
                card_id -> card with ID card_id selected
    */
    const [activeCard,setActiveCard] = useState("-1")

    /*  state to keep track of all changed card cords
        Set {
            card_id : string
        }
    */
   const [updatedCards,setUpdatedCards] = useState(new Set())

    useEffect(()=>{
        const getCardDetails = async ()=>{
            const resp = await axios({
                method : "POST",
                url : `${host}${getCards}`,
                headers : "application/json",
                data : {
                    jwt : user_jwt,
                    chartid : chart_id
                }
            })

            const { error,message } = resp.data

            if(error){
                console.log(message)
            }else{
                setCards(formatCardData(resp.data.data))
            }

        }

        getCardDetails()
    },[user_jwt,chart_id])

    return (
        <LinkChartContextProvider.Provider value={{
            cards,
            setCards,
            gMatrix,
            setGMatrix,
            activeCard,
            setActiveCard,
            updatedCards,
            setUpdatedCards
        }}> 
            {children}
        </LinkChartContextProvider.Provider>
    )
}
