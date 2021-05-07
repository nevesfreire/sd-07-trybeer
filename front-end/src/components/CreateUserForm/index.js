import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Label, Input } from './styles';
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

    if (role === 'administrator') {
      history.push('/admin/orders');
    }

    if (role === 'client') {
      history.push('/products');
    }
  };

  return (
    <Form onSubmit={ onSubmitHandler }>
      <Label data-testid="signup-name">
        Nome
        <Input
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          placeholder="name"
          type="text"
          name="name"
          required
        />
      </Label>

      <Label data-testid="signup-email">
        Email
        <Input
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Email address"
          type="email"
          name="email"
          required
        />
      </Label>
      { userExists && <span>Já existe um usuário com esse e-mail.</span> }

      <Label data-testid="signup-password">
        Senha
        <Input
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Password"
          type="password"
          name="password"
          required
        />
      </Label>

      <Label>
        Quero vender
        <Input
          data-testid="signup-seller"
          checked={ iWantToSell }
          onChange={ handleRole }
          type="checkbox"
        />
      </Label>

      <button
        type="submit"
        disabled={ validateRegister(name, email, password) }
        data-testid="signup-btn"
      >
        Cadastrar
      </button>
    </Form>
  );
}
export default CreateUserForm;
