import React from 'react';
import { NavLink } from 'react-router-dom'
import classes from './NavItem.module.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <NavLink
            exact={true}
            to={props.link} 
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;