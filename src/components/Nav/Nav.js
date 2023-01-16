import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import styles from './CSS/Nav.module.css'

import { UserCredentialContextProvider } from '../UserCredentialProvider/UserCredentialProvider'

const navOptions = [
  {
    id : 1,
    nav_name : 'Home',
    link : '/',
    call_back_flag : false
  },{
    id : 2,
    nav_name : 'Link Chart',
    link : '/linkchart'
  },{
    id : 3,
    nav_name : 'Login',
    link : '/login',
    call_back_flag : false
  },{
    id : 4,
    nav_name : 'Log Out',
    link : '/',
    call_back_flag : true,
  }
]

export const Nav = () => {
  const { userDetails } = useContext(UserCredentialContextProvider)

  return (
    <div className={styles.container}>
        <div className={styles.appName}>
            <h1>Planit</h1>
        </div>
        
        <nav>
            <ul>
                
                {
                  navOptions.map((nav)=>{
                    if(nav.nav_name==='Login' && userDetails.logged_in) return null
                    if(nav.nav_name==='Log Out' && !userDetails.logged_in) return null

                    return <NavLink 
                                key={nav.id} 
                                nav_name={nav.nav_name} 
                                link={nav.link} 
                                call_back_flag={nav.call_back_flag} 
                                logout_prompt={()=>{}}/>
                  })
                }
            </ul>
        </nav>
    </div>
  )
}

const NavLink = ({nav_name, link, call_back_flag, logout_prompt})=>{
  const handleClick = (e)=>{
    if(!call_back_flag) return
    logout_prompt()
  }
  return (
    <li><Link onClick={handleClick} className={styles.link} to={link}>{nav_name}</Link></li>
  )
}
