import React from 'react';

import styles from './NavItems.module.css';
import NavigationItem from './NavItem/NavItem';

const navigationItems = () => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" active>Home</NavigationItem>
        <NavigationItem link="/" >Visit</NavigationItem>
        <NavigationItem link="/">Visited</NavigationItem>
    </ul>
);

export default navigationItems;