import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './CSS/Nav.module.css'

import { UserCredentialContextProvider } from '../UserCredentialProvider/UserCredentialProvider'
import ConfirmPrompt from '../GeneralUtil/ConfirmPrompt'

export const Nav = () => {
  const { userDetails : { logged_in }, logout } = useContext(UserCredentialContextProvider)

  const [displayConfirmPrompt, setDisplayConfirmPrompt] = useState(false)

  //hamburger state
  const [selected,setSelected] = useState(false)

  const handleConfirmation = (intent)=>{
    if(intent){
      logout()
    }
    setDisplayConfirmPrompt(false)
  }

  const handleClick = (e)=>{
    setDisplayConfirmPrompt(true)
  }

  const offHandler = (e)=>{
    setSelected(false)
  }

  return (
    <>
    <div className={styles.container}>
        <div className={styles.appName}>
            <h1>Planit</h1>
        </div>
        <div className={`${styles.hamburger} ${selected?styles.selected:null}`}
        onClick={(e)=> {setSelected(prev=>!prev)} }>
          <div className={styles.exterior}></div>
          <div className={styles.interior}></div>
          <div className={styles.exterior}></div>
        </div>
        <nav className={selected? styles.selected : null}>
            <ul onClick={offHandler}>
            <li><Link className={styles.link} to='/'>Home</Link></li>
            <li><Link className={styles.link} to='/linkchart'>Link Chart</Link></li>
            {
              !logged_in && (
                <>
                <li><Link className={styles.link} to='/login'>Login</Link></li>
                <li><Link className={styles.link} to='/register'>Join</Link></li>
                </>
              )
            }
            {
              logged_in && (
                <li className={styles.logout} onClick={handleClick}>Log Out</li>
              )
            }
            </ul>
        </nav>
    </div>
    {
      displayConfirmPrompt && <ConfirmPrompt prompt={"Do You Want To Logout?"} confirmFunction={handleConfirmation}/>
    }
    </>
  )
}
