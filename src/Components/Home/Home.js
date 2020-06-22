import React, { Fragment } from 'react';

const home = props => (
    <Fragment>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Fragment>
)

export default home;