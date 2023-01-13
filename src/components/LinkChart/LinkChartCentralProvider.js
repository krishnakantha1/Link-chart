import React,{ useState,createContext } from 'react'

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
    //cards to be displayed in the svg
    /*  CARDS STRUCTURE : object
        {
            card_id : {
                id : card_id (string),
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

    //main SVG size [height, width]
    //initialy set to 0 but will be imediatly set to svg container div height and width
    const [svgDim,setSvgDim] = useState({height : 0, width : 0})

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

    return (
        <LinkChartContextProvider.Provider value={{
            cards,
            setCards,
            svgDim,
            setSvgDim,
            gMatrix,
            setGMatrix,
            activeCard,
            setActiveCard
        }}> 
            {children}
        </LinkChartContextProvider.Provider>
    )
}
