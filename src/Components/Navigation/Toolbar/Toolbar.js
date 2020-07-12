import React from 'react';
import styles from './Toolbar.module.css'
import NavigationItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => (
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <nav className={styles.DesktopOnly}>
            <NavigationItems onLogout={props.onLogout}/>
        </nav>
    </header>
)

export default toolbar;