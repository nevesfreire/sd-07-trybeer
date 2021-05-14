import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import validateRegister from './validation';
import { registerUser } from '../../services/apiService';

function CreateUserForm() {
  // Estados de campos
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [iWantToSell, setiWantToSell] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const history = useHistory();

  const handleRole = () => {
    setiWantToSell(!iWantToSell);
    if (!iWantToSell) return setRole('administrator');
    return setRole('client');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      role,
    };
    validateRegister(user);

    const response = await registerUser(user).then((apiResponse) => apiResponse);
    if (response.err) return setUserExists(true);
    setUserExists(false);

    if (response) {
      localStorage.setItem('user', JSON.stringify(response));
    }

    if (role === 'administrator') {
      history.push('/admin/orders');
    }

    if (role === 'client') {
      history.push('/products');
    }
  };

  return (
    <form onSubmit={ onSubmitHandler }>
      <label>
        Nome
        <input
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          placeholder="name"
          type="text"
          name="name"
          data-testid="signup-name"
          required
        />
      </label>

      <label>
        Email
        <input
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Email address"
          type="email"
          name="email"
          data-testid="signup-email"
          required
        />
      </label>
      { userExists && <span>Já existe um usuário com esse e-mail.</span> }

      <label>
        Senha
        <input
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Password"
          type="password"
          name="password"
          data-testid="signup-password"
          required
        />
      </label>

      <label>
        Quero vender
        <input
          data-testid="signup-seller"
          checked={ iWantToSell }
          onChange={ handleRole }
          type="checkbox"
        />
      </label>

      <button
        type="submit"
        disabled={ validateRegister(name, email, password) }
        data-testid="signup-btn"
      >
        Cadastrar
      </button>
    </form>
  );
}
export default CreateUserForm;
