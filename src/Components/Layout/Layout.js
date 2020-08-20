import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Toolbar from '../Navigation/Toolbar/Toolbar'
import Restaurants from '../Restaurants/Restaurants';
import Visit from '../User/Visit/Visit'
import Visited from '../User/Visited/Visited'
import User from '../User/User'
import Login from '../Auth/Login'
import SignUp from '../Auth/Signup'
import Banner from '../Layout/LoginBanner'


const Layout = (props) => {
        // showBackdrop: false,
        // showMobileNav: false,
    const [isAuth, setIsAuth] = useState(false)
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [authLoading, setAuthLoading] = useState(false)
    
    //   mobileNavHandler = isOpen => {
    //     this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
    //   };
    
    //   backdropClickHandler = () => {
    //     this.setState({ showBackdrop: false, showMobileNav: false, error: null });
    //   };
    
    const logoutHandler = () => {
        setIsAuth(false)
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
    };
    
    const loginHandler = (event, authData) => {
        event.preventDefault();
        setAuthLoading(true);
        axios.post('https://local-bytes-api.herokuapp.com/auth/login', {
            email: authData.email,
            password: authData.password
        })
        .then(res => {
        if (res.status === 422) {
            throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
            console.log('Error!');
            throw new Error('Could not authenticate you!');
        }
            return res.data;
        })
        .then(resData => {
            console.log(resData)
            setIsAuth(true)
            setToken(resData.token)
            setAuthLoading(false)
            setUserId(resData.id)
            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.id);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
            setAutoLogout(remainingMilliseconds);
        })
        .catch(err => {
            console.log(err);
            setIsAuth(false)
            setAuthLoading(false)
        });
    };
    
    const signupHandler = (event, signupForm) => {
        event.preventDefault();
        setAuthLoading(true);
        axios.post('https://local-bytes-api.herokuapp.com/auth/signup', {
          email: signupForm.email.value ,
          password: signupForm.password.value,
          first: signupForm.first.value ,
          last: signupForm.last.value ,
          confirm: signupForm.confirm.value
        })
        .then(res => {
            if (res.status === 422) {
                throw new Error(
                "Validation failed. Make sure the email address isn't used yet!"
                );
            }
            if (res.status !== 200 && res.status !== 201) {
                console.log('Error!');
                throw new Error('Creating a user failed!');
            }
            return res;
            })
        .then(resData => {
            console.log(resData);
            setIsAuth(false)
            setAuthLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsAuth(false)
            setAuthLoading(false)
        });
    };
    
    const setAutoLogout = useCallback((milliseconds) => {
        setTimeout(() => {
            logoutHandler();
        }, milliseconds);
    },[]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        if (!token || !expiryDate) {
          return;
        }
        if (new Date(expiryDate) <= new Date()) {
          logoutHandler();
          return;
        }
        const userId = localStorage.getItem('userId');
        const remainingMilliseconds =
          new Date(expiryDate).getTime() - new Date().getTime();
        setIsAuth(true)
        setToken(token)
        setUserId(userId);
        setAutoLogout(remainingMilliseconds);
      }, [setAutoLogout])

    let pages = [
        <Banner key='banner'/>,
        <Switch key='switch'>
            <Route
                path="/signup"
                key='signup'
                exact
                render={props => (
                    <SignUp
                    {...props}
                    onSignup={signupHandler}
                    loading={authLoading}
                    />
            )}/>
            <Route
                path="/"
                key='login'
                render={props => (
                    <Login
                    {...props}
                    onLogin={loginHandler}
                    loading={authLoading}
                    />
            )}/>
        </Switch>
    ]

    if (isAuth) {
        pages = [
        <Toolbar key ='toolbar' onLogout={logoutHandler}/>,
        <Switch key='switch'>
            <Route key='b' path="/visit" exact 
                component={() => <Visit token={token} userId={userId}/>} />
            <Route key='c' path="/visited" exact 
                component={() => <Visited token={token} userId={userId}/>} />
            <Route key='d' path="/profile" exact 
                component={() => <User token={token} userId={userId}/>} />
            <Route key='a' path="/" 
                component={() => <Restaurants token={token} userId={userId}/>} />
        </Switch>]
    }

    return (
        <Fragment>
            {pages}
        </Fragment>)
}

export default Layout;