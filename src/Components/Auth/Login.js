import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { required, length, email } from '../../util/validators';
import Auth from './Auth';

const Login = props => {
    const [loginForm, setLoginForm] = useState({
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email]
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })]
      },
      formIsValid: false
    });

  const inputChangeHandler = (input, value) => {
    const newLoginForm = {...loginForm}
    let isValid = true;
    for (const validator of loginForm[input].validators) {
      isValid = isValid && validator(value);
    }

    newLoginForm[input].valid = isValid
    newLoginForm[input].value = value
    newLoginForm[input].touched = true

    let formIsValid = true;
    for (const inputName in newLoginForm) {
      if (inputName !== 'formIsValid'){
        formIsValid = formIsValid && newLoginForm[inputName].valid;
      }
    }

    newLoginForm.formIsValid = formIsValid

    setLoginForm(newLoginForm)


  };


    return (
      <Auth>
        <form
          onSubmit={e =>
            props.onLogin(e, {
              email: loginForm.email.value,
              password: loginForm.password.value
            })
          }
        >
          <Input
            id="email"
            // label="Your E-Mail"
            type="email"
            control="input"
            onChange= {inputChangeHandler}
            value={loginForm.email.value}
            valid={loginForm['email'].valid}
            touched={loginForm['email'].touched}
            placeholder="Email"
          />
          <Input
            id="password"
            // label="Password"
            type="password"
            control="input"
            onChange={inputChangeHandler}
            value={loginForm['password'].value}
            valid={loginForm['password'].valid}
            touched={loginForm['password'].touched}
            placeholder="Password"
          />
          <Button design="raised" type="submit" loading={props.loading}>
            Log In
          </Button>
          <Link to ='/signup' 
            style={{color: 'dodgerblue', textDecoration: 'none'}} >Create new account</Link>        
            </form>
      </Auth>
    );
  }


export default Login;
