import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
import { Link, NavLink } from "react-router-dom";
import SearchBox from "./searchBox"


export default function NavBar() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin

  const [menu, setMenu] = useState(false)


  const logoutUser = async () =>{
    await axios.get('/user/logout')
    
    localStorage.removeItem('firstLogin')
    
    window.location.href = "/";
}


const offline = () => {
  if(!isLogged && !isAdmin){
    return(
      <div className="logged_route user_route">
          <li><Link to="/history"><i className="fa fa-list-ol" aria-hidden="true"></i>&nbsp;News</Link></li>
         <li><Link to="/history"><i className="fa fa-list-ol" aria-hidden="true"></i>&nbsp;Following</Link></li>
         <li><Link to="/history"><i className="fa fa-bell" aria-hidden="true"></i>&nbsp;Notification</Link></li>
          <div className="nav-link nav-item sarch_article" to="/register"><SearchBox/></div>
          <li><Link to="/user"><i class="fa fa-lock"></i>&nbsp;Offline</Link></li>
           <li><Link to="/login"><i className="fa fa-sign-in"></i>&nbsp;login</Link></li>
      </div>
  )
  }
 
}
const adminOnline = () =>{
    if(isAdmin){
      return(
        <div className="admin_route">
          <div className="nav-link nav-item sarch_article" to="/register"><SearchBox/></div>
            <li><Link to="/create_article"><i className="fas fa-folder-plus"></i>Create Article</Link></li>
            <li><Link to="/category">Categories</Link></li>
             <li><Link to="/history">History</Link></li>
            <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
        </div>
    )
    }
}

const userOnline = () =>{
  if(isLogged && !isAdmin){
    return ( <div className="user_route">
      <li><Link to="/history"><i className="fa fa-list-ol" aria-hidden="true"></i>&nbsp;Spaces</Link></li>
       <li><Link to="/history"><i className="fa fa-list-ol" aria-hidden="true"></i>&nbsp;Following</Link></li>
        <li><Link to="/history"><i className="fa fa-bell" aria-hidden="true"></i>&nbsp;Notification</Link></li>
        <div className="nav-link nav-item sarch_article" to="/register"><SearchBox/></div>
        <li><Link to="/user"><i className="fa fa-users" aria-hidden="true"></i>&nbsp;User01</Link></li>
        <li><Link to="/" onClick={logoutUser}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</Link></li>
      
   </div>)
  }
}


  return (
    <div className="nav-container">
          <nav className="nav_render">
            <div className="menu" onClick={() => setMenu(!menu)}>
                menue
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : '9ja'}</Link>
                </h1>
            </div>

            <ul>
                <li className="li"><Link to="/dashboard">{isAdmin ? 'Dashboard' : 'Home'}</Link></li>
                  {adminOnline()}
                  {userOnline()}
                  {offline()}
            </ul>

            
        </nav>
    </div>
  );
}
