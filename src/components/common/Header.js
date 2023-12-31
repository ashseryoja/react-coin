import React from 'react';
import {Link} from 'react-router-dom';
import Search from './Search';
import logo from './logo.png'
import './Header.css';

const Header = () => {
    return (
        <div className='Header'>
            <Link to='/'>
                <img src={logo} className='Header-logo' alt='Header logo'></img>
            </Link>
            <Search/>
        </div>
    )
}

export default Header;