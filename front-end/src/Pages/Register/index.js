import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
// import PropTypes from 'prop-types';
import { validateName, validateFields } from '../../util/validations';
import { registerUser } from '../../servicesAPI/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (validateFields(email, password) && validateName(name)) {
      return setIsValid(true);
    }
    return setIsValid(false);
  }, [name, email, password]);

  const createUser = async () => {
    const role = isSeller ? 'administrator' : 'client';
    const user = await registerUser({ name, email, password, role });
    if (user.data) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.data.role === 'administrator') return history.push('/admin/orders');
      return history.push('/products');
    }
    setShowMessage(true);
  };

  return (
    <div>
      <form>
        <label htmlFor="name">
          Nome
          <input
            data-testid="signup-name"
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="signup-email"
            type="email"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="signup-password"
            type="password"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <label htmlFor="seller">
          <input
            type="checkbox"
            id="seller"
            data-testid="signup-seller"
            onClick={ () => setIsSeller(!isSeller) }
          />
          Quero vender
        </label>
        <button
          type="button"
          data-testid="signup-btn"
          disabled={ !isValid }
          onClick={ createUser }
        >
          Cadastrar
        </button>
        { showMessage && <p>Já existe um usuário com esse e-mail.</p>}
      </form>
    </div>
  );
};

// Register.propTypes = {};

export default Register;
