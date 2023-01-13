/*
    Has all required functions for modifing state cards in LinkCharCentralProvider Component.
*/

import { isNullOrUndefined } from "./general_util"

/*
    used to create stand alone card.

    card_id : string 
    title : string
    description : string
    description : string
    x : number
    y : number
    setCards : react state setter
*/
export const createCard = (card_id,title,description,x,y,setCards)=>{
    if(isNullOrUndefined(card_id)) return false
    if(isNullOrUndefined(title)) return false
    if(isNullOrUndefined(description)) return false
    if(isNullOrUndefined(x)) return false
    if(isNullOrUndefined(y)) return false

    setCards(prev=>{
        const newCards = {...prev}
        newCards[card_id] = {
            card_id,
            title,
            description,
            x,
            y,
            parent_of : new Set(),
            child_of : new Set()
        }

        return newCards
    })

    return true
}

/*
    used to add an array of child cards to one parent card.

    card_id : string
    child_id_list : Array of card_id (string)
    setCards : react state setter
*/
export const massAddChildCards = (card_id,child_id_list,setCards)=>{
    if(isNullOrUndefined(card_id)) return false
    if(isNullOrUndefined(child_id_list)) child_id_list = []

    setCards(prev=>{
        const newCards = {...prev}

        const parent_set = new Set(newCards[card_id].parent_of)

        child_id_list.forEach(parent_set.add,parent_set);

        for(let child_id of child_id_list){
            newCards[child_id].child_of.add(card_id)
        }

        return newCards
    })
}

/*
    used to get a list of card_id from cards state

    cards : react state
*/
export const getCardIDList = (cards)=>{
    if(isNullOrUndefined(cards)) return []

    return Object.keys(cards)
}

/*
    used to get card from cards with the given id

    card_id : string
    cards : react state
*/
export const getCardWithID = (card_id,cards)=>{
    if(isNullOrUndefined(cards)) return {}
    if(!cards[card_id]) return {}

    return cards[card_id]
}

/*
    used to update x,y value for a card

    card_id : string
    x : number
    y : number
    setCards : react state setter
*/
export const updateCordsForCard = (card_id,x,y,setCards)=>{
    if(isNullOrUndefined(card_id)) return false;
    if(isNullOrUndefined(x)) return false;
    if(isNullOrUndefined(y)) return false;

    setCards(prev=>{
        const newCards = {...prev}
        newCards[card_id].x = x
        newCards[card_id].y = y
        return newCards
    })
    return true
}

/*
    used to delete a card.

    card_id : string
    setCards : react state setter
*/
export const deleteCard = (card_id,setCards)=>{
    if(isNullOrUndefined(card_id)) return false
    
    setCards(prev=>{
        const newCards = {...prev}

        for(let parent_id of newCards[card_id].child_of){
            newCards[parent_id].parent_of.delete(card_id)
        }

        if (newCards[card_id]){
            delete newCards[card_id]
        }

        return newCards
    })

    return true
}

/*
    used to create a child card and also link it to a parent card.

    parent_id : card_id (string)
    child_id : card_id (string) 
    title : string
    description : string
    description : string
    x : number
    y : number
    setCards : react state setter
*/
export const createChildCard = (parent_id,child_id,title,description,x,y,setCards)=>{
    if(isNullOrUndefined(parent_id)) return false
    if(isNullOrUndefined(child_id)) return false
    if(isNullOrUndefined(title)) return false
    if(isNullOrUndefined(description)) return false
    if(isNullOrUndefined(x)) return false
    if(isNullOrUndefined(y)) return false

    setCards(prev=>{
        const newCards = {...prev}
        newCards[child_id] = {
            child_id,
            title,
            description,
            x,
            y,
            parent_of : new Set(),
            child_of : new Set()
        }

        newCards[parent_id].parent_of.add(child_id)
        newCards[child_id].child_of.add(parent_id)

        return newCards
    })

    return true
}

/*
    used to link two existing cards.

    parent_id : card_id (string)
    child_id : card_id (string)
    cards : react state
    setCards : react state setter
*/
export const linkTwoCreatedCards = (parent_id,child_id,cards,setCards)=>{
    if(isNullOrUndefined(parent_id)) return false
    if(isNullOrUndefined(child_id)) return false
    if(parent_id === child_id) return false
    if(cards[parent_id].parent_of.has(child_id) && cards[child_id].child_of.has(parent_id)) return false

    setCards(prev=>{
        const newCards = {...prev}

        newCards[parent_id].parent_of = new Set(newCards[parent_id].parent_of)
        newCards[child_id].child_of = new Set(newCards[child_id].child_of)

        newCards[parent_id].parent_of.add(child_id)
        newCards[child_id].child_of.add(parent_id)
  
        return newCards
      })

      return true;
}

/*
    used to delete a link between two cards.

    parent_id : card_id (string)
    child_id : card_id (string)
    cards : react state
    setCards : react state setter
*/
export const deleteLink = (parent_id,child_id,cards,setCards)=>{
    if(isNullOrUndefined(parent_id)) return false
    if(isNullOrUndefined(child_id)) return false
    if(parent_id === child_id) return false

    if(cards[parent_id].parent_of.has(child_id) && cards[child_id].child_of.has(parent_id)){
        setCards(prev=>{
            const newCards = {...prev}
            
            newCards[parent_id].parent_of = new Set(newCards[parent_id].parent_of)
            newCards[child_id].child_of = new Set(newCards[child_id].child_of)

            newCards[parent_id].parent_of.delete(child_id)
            newCards[parent_id].child_of.delete(parent_id)

            return newCards
        })
    }
}