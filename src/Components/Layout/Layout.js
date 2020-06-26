import React, { Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Restaurants from '../Restaurants/Restaurants';
import Visit from '../User/Visit/Visit'
import Visited from '../User/Visited/Visited'
import User from '../User/User'
import { Route } from 'react-router-dom';

const layout = props => (
    <Fragment>
        <Toolbar/>
        <Route path="/" exact component={Restaurants} />
        <Route path="/visit" exact component={Visit} />
        <Route path="/visited" exact component={Visited} />
        <Route path="/profile" exact component={User} />
    </Fragment>
)

export default layout;