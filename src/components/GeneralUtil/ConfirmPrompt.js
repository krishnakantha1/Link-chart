import React from 'react'

import styles from './CSS/ConfirmPrompt.module.css'

export default function ConfirmPrompt({ prompt, confirmFunction }) {

    const handleClick = (e)=>{
        if(e.target.getAttribute('data-intent')==='confirm'){
            confirmFunction(true)
        }else{
            confirmFunction(false)
        }
    }
  return (
    <div className={styles.container} onClick={handleClick} data-intent='denay'>
        <form className={styles.promptForm} onClick={(e)=>{e.stopPropagation()}}>
            <label>{prompt}</label>
            <div>
                <button onClick={handleClick} data-intent='confirm' type='button'>Confirm</button>
                <button onClick={handleClick} data-intent='denay' type='button'>Denay</button>
            </div>
        </form>
    </div>
  )
}
