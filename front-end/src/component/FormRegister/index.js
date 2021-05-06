import React, { useState, useEffect, useCallback } from 'react';

const defaultForm = {
  name: '',
  email: '',
  password: '',
  checkbox: false,
  role: 'client',
};

function FormRegister() {
  const [formRegister, setFormRegister] = useState(defaultForm);
  const [buttonState, setButtonState] = useState(true);
  const inputValidation = useCallback(() => {
    const { email, name, password } = formRegister;
    const emailRe = /\S+@\S+\.\S+/;
    const nameRe = /^[a-zA-Z]{12,50}$/;
    const passwordMinLength = 6;
    return nameRe.test(name) && emailRe.test(email) && password.length >= passwordMinLength;
  }, [formRegister]);

  const handleButtonState = useCallback(() => {
    if (inputValidation()) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [inputValidation]);

  const handleImputChange = event => {
    const { value, name } = event.target;
    let checkbox = formRegister.checkbox;

    if (name === 'checkbox') {
      setFormRegister({
        ...formRegister,
        [name]: !checkbox,
      });
    } else {
      setFormRegister({ ...formRegister, [name]: value });
    }
  };

  const handleRoleUser = checkbox => {
    let role;
    checkbox ? (role = 'admin') : (role = 'client');
    return role;
  };

  useEffect(() => {
    let checkbox = formRegister.checkbox;
    setFormRegister({
      ...formRegister,
      role: handleRoleUser(checkbox),
    });
  }, [formRegister.checkbox]);

  useEffect(() => {
    handleButtonState();
  }, [formRegister, handleButtonState]);


  return (
    <form>
      <label htmlFor='name'>
        Nome
        <input
          type='text'
          id='name'
          name='name'
          data-testid='signup-name'
          onChange={e => handleImputChange(e)}
        />
      </label>
      <label htmlFor='email'>
        Email
        <input
          type='email'
          id='email'
          name='email'
          data-testid='signup-email'
          onChange={e => handleImputChange(e)}
        />
      </label>
      <label htmlFor='password'>
        Password
        <input
          type='password'
          id='password'
          name='password'
          data-testid='signup-password'
          onChange={e => handleImputChange(e)}
        />
      </label>
      <div>
        <label htmlFor='checkbox'>
          <input
            type='checkbox'
            id='checkbox'
            name='checkbox'
            data-testid='signup-seller'
            onChange={e => handleImputChange(e)}
          />
          Quero vender
        </label>
      </div>
      <button 
      type='submit' 
      data-testid='signup-btn'
      disabled={buttonState}
      >        
        Cadastrar
      </button>
    </form>
  );
}

export default FormRegister;
