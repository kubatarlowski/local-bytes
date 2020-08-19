import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { required, length, email } from '../../util/validators';
import Auth from './Auth';

const Signup = props => {
  const [signupForm, setSignupForm] = useState({
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
      confirm: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })]
      },
      first: {
        value: '',
        valid: false,
        touched: false,
        validators: [required]
      },      
      last: {
        value: '',
        valid: false,
        touched: false,
        validators: [required]
      },
      formIsValid: false     
    });

  const inputChangeHandler = (input, value) => {
    const newSignUpForm = {...signupForm}
    let isValid = true;
    for (const validator of signupForm[input].validators) {
      isValid = isValid && validator(value);
    }

    newSignUpForm[input].valid = isValid
    newSignUpForm[input].value = value
    newSignUpForm[input].touched = true

    let formIsValid = true;
    for (const inputName in newSignUpForm) {
      if (inputName !== 'formIsValid'){
        formIsValid = formIsValid && newSignUpForm[inputName].valid;
      }
    }
    newSignUpForm.formIsValid = formIsValid;
    setSignupForm(newSignUpForm)
  };

    return (
      <Auth>
        <form onSubmit={e => props.onSignup(e,signupForm)}>
          <Input
            id="first"
            type="first"
            control="input"
            onChange={inputChangeHandler}
            value={signupForm['first'].value}
            valid={signupForm['first'].valid}
            touched={signupForm['first'].touched}
            placeholder="First name"
          />
          <Input
            id="last"
            type="last"
            control="input"
            onChange={inputChangeHandler}
            value={signupForm['last'].value}
            valid={signupForm['last'].valid}
            touched={signupForm['last'].touched}
            placeholder="Last name"
          />
          <Input
            id="email"
            type="email"
            control="input"
            onChange={inputChangeHandler}
            value={signupForm['email'].value}
            valid={signupForm['email'].valid}
            touched={signupForm['email'].touched}
            placeholder="Email"
          />
          <Input
            id="password"
            type="password"
            control="input"
            onChange={inputChangeHandler}
            value={signupForm['password'].value}
            valid={signupForm['password'].valid}
            touched={signupForm['password'].touched}
            placeholder="Password"
          />
          <Input
            id="confirm"
            type="password"
            control="input"
            onChange={inputChangeHandler}
            value={signupForm['confirm'].value}
            valid={signupForm['confirm'].valid}
            touched={signupForm['confirm'].touched}
            placeholder="Confirm password"
          />
          <Button design="raised" type="submit" loading={props.loading}>
            Sign Up
          </Button>
          <Link to ='/'
            style={{color: 'dodgerblue', textDecoration: 'none'}} >Log in to existing account</Link>        
        </form>
      </Auth>
    );
  }

export default Signup;
