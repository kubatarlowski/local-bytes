import React from 'react';

import styles from './NavItems.module.css';
import NavigationItem from './NavItem/NavItem';

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/visit" >Visit</NavigationItem>
        <NavigationItem link="/visited">Visited</NavigationItem>
        <NavigationItem link="/profile">Profile</NavigationItem>
        <button 
            onClick={props.onLogout}>Logout</button>
    </ul>
);

export default navigationItems;