import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

function Register () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const regexString = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
    const regexEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const MIN_LENGTH = 6;
    const MIN_NAME = 12;
    if(password.length >= MIN_LENGTH && name.length > MIN_NAME && regexString.test(name) && regexEmail.test(email)){
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, password])

  function handleChange({ target }) {
    switch(target.id) {
      case 'name-input':
        return setName(target.value);
      case 'email-input':
        return setEmail(target.value);
      case 'password-input':
        return setPassword(target.value);
      default:
        return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    return history.push('/products');
  }

  return (
    <div>
      <h2>Página de registro</h2>
      <form>
        <label htmlFor="name-input">
          <h6>Nome</h6>
          <input 
            type="text"
            id="name-input"
            data-testid="signup-name"
            onChange={ handleChange } 
            value={ name } 
          />
        </label>
        <label htmlFor="email-input">
          <h6>Email</h6>
          <input
            type="email"
            id="email-input"
            data-testid="signup-email"
            onChange={ handleChange }
            value={ email } 
          />
        </label>
        <label htmlFor="password-input">
          <h6>Senha</h6>
          <input 
            type="password"
            id="password-input"
            data-testid="signup-password"
            onChange={ handleChange }
            value={ password }
          />
        </label>
        <label htmlFor="checkbox-input">
          <input 
            type="checkbox"
            id="checkbox-input"
            data-testid="signup-seller"
            onClick={ () => setIsSeller(!isSeller) } 
            checked={ isSeller } 
          />
          Quero vender
        </label>
        <button 
            type="submit"
            data-testid="signup-btn"
            onClick={ handleSubmit } 
            disabled={ disabled }
        >
            Cadastrar
        </button>
      </form>
    </div>
  )
}

export default Register;
