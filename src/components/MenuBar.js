import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {AuthContext} from '../context/auth';

export default function MenuBar() {
    const pathname = window.location.pathname;
    let path = (pathname === "/") ? "home" : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => setActiveItem(name);
    const {user,logout}=useContext(AuthContext);

    let menuBar=(user)?(<Menu pointing secondary size="massive" color="teal">
    <Menu.Item
        name={user.username}
        active
        as={Link}
        to="/"
    />

    <Menu.Menu position='right'>
        <Menu.Item
            name='Logout'
            onClick={()=>{
                window.location.href="/";
                logout();}
            }
           
        />
        <Menu.Item
            name='github'
            active={activeItem === 'github'}
            onClick={handleItemClick}
            as='a'
            href="https://github.com/aashishwastaken/MERNG-SocialNetwork-Client"
        />
       
    </Menu.Menu>
</Menu>):(<Menu pointing secondary size="massive" color="teal">
    <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
    />

    <Menu.Menu position='right'>
        <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
        />
        <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
        />
         <Menu.Item
            name='github'
            active={activeItem === 'github'}
            onClick={handleItemClick}
            as='a'
            href="https://github.com/aashishwastaken/MERNG-SocialNetwork-Client"
        />
    </Menu.Menu>
</Menu>);

    return menuBar;
}
