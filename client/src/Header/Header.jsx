import Logo from '../assets/imgs/logo.png'
import DefaultAvatar from '../assets/imgs/default-avatar.png'
import MobileNavIcon from '../assets/imgs/nav-menu.png'

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';

import { Link } from "react-router-dom";

function Header(){

    const navigate = useNavigate()
    let [username, setusername] = useState('Guest')
    let isLoggedIn = null

    if(localStorage.getItem('token')){
        isLoggedIn = true
    } else {
        isLoggedIn = false
    }
    
    useEffect(() => {
        // Assuming the JWT is stored in local storage under 'jwtToken'
        const token = localStorage.getItem('token');
        console.log('running')
        if (token) {
          try {
            const decoded = jwtDecode(token);
            setusername(decoded.username)
            console.log(decoded); // This will log the decoded JWT payload
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      }, [isLoggedIn]);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        isLoggedIn = false;
        navigate('/')
    }

    return(
        <header>
                <div className="header-left">
                <div id="logo">
                    <Link to={`/`}>
                        <img src={Logo} width="320" height="100%" alt="Shark Typers"/>
                    </Link>
                </div>
                <div className="nav">
                    <ul>
                        <li className="mobile-button"><img src={MobileNavIcon} width="48" height="48" alt="Mobile Navigation"/></li>
                        <div className="hide-mobile">
                        <li><Link to={`/`}>Home</Link></li>
                        <li><Link to={`/race`}>Start Race</Link></li>
                        <li><Link to={`/highscores`}>High Scores</Link></li>
                        <li><Link to={`/shop`}>Browse Shop</Link></li>
                        <li>{ isLoggedIn ? <Link to={`/profile`}>View Profile</Link> : <Link to={`/login`}>Sign In</Link> }</li>
                        </div>
                    </ul>
                </div>
                </div>
                <div className="header-right">
                    <div className="user-nav-ui">
                    <Link to={`/login`}>
                    <div className="user-avatar">
                            <img id="avatar" src={DefaultAvatar} width="32" height="32" alt="Your Avatar" title="View Profile"/>
                    </div>
                    </Link>
                        { isLoggedIn ? <><p> Welcome { username } </p><button type="button" onClick={ handleLogOut }> Log Out </button> </>: <h3>Sign In to experience the full game!</h3>}
                    </div>
                </div>
            </header> 
    )
}

export default Header