import React, { useEffect, useState } from 'react';
import FormWrapper from './styles';

const defaultForm = {
  email: '',
  password: ''
}

function FormLogin() {
  const [formLogin, setFormLogin] = useState(defaultForm);
  const [buttonState, setButtonState] = useState(true);

  const handleInputChange = (event, name) => {    
    const {value} = event.target;
    setFormLogin({...formLogin, [name]: value} );    
  }

  const inputValidation = () => {
    const { email, password } = formLogin;
    const emailRe = /\S+@\S+\.\S+/;
    const passwordMinLength = 6;
    return emailRe.test(email) && password.length >= passwordMinLength;
  }

  const handleButtonState = () => {
    if(inputValidation()){
      setButtonState(false);
    }else {
      setButtonState(true);
    }

  }

  useEffect(()=> {
    handleButtonState();
  },[formLogin.email, formLogin.password])

  return (
    <FormWrapper >
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          data-testid="email-input"
          value={formLogin.name}
          onChange={(event) => handleInputChange(event, 'email')}
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          id="password"
          type="password"
          data-testid="password-input"
          value={formLogin.password}
          onChange={(event) => handleInputChange(event, 'password')}          
        />
      </label>
      <button
        type="submit"
        data-testid="signin-btn"
        disabled={buttonState}
      >Entrar</button>
    </FormWrapper>
  )
}

export default FormLogin;