import React, { useState } from 'react';

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
            id="email"
            label="Your E-Mail"
            type="email"
            control="input"
            onChange={inputChangeHandler}
            value={signupForm['email'].value}
            valid={signupForm['email'].valid}
            touched={signupForm['email'].touched}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            control="input"
            onChange={inputChangeHandler}
            value={signupForm['password'].value}
            valid={signupForm['password'].valid}
            touched={signupForm['password'].touched}
          />
          <Button design="raised" type="submit" loading={props.loading}>
            Signup
          </Button>
        </form>
      </Auth>
    );
  }

export default Signup;
