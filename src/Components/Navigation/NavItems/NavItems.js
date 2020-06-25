import React from 'react';

import styles from './NavItems.module.css';
import NavigationItem from './NavItem/NavItem';

const navigationItems = () => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/visit" >Visit</NavigationItem>
        <NavigationItem link="/visited">Visited</NavigationItem>
        <NavigationItem link="/profile">Profile</NavigationItem>
    </ul>
);

export default navigationItems;