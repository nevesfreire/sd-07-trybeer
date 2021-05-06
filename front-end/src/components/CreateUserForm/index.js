import React, { useState } from 'react';
import { Form, Label, Input } from './styles';
import validateRegister from './validation';

// const handleSubmit = (evt) => {
//   evt.preventDefault();
// }

function CreateUserForm() {
  // Estados de campos
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [iWantToSell, setiWantToSell] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    validateRegister(user);
  };

  console.log({ validate: validateRegister(name, email, password) });

  return (
    <Form onSubmit={ onSubmitHandler }>
      <Label>
        Nome
        <Input
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          placeholder="name"
          type="text"
          name="name"
          data-testid="signup-name"
          required
        />
      </Label>

      <Label>
        Email
        <Input
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Email address"
          type="email"
          name="email"
          data-testid="signup-email"
          required
        />
      </Label>

      <Label>
        Senha
        <Input
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Password"
          type="password"
          name="password"
          data-testid="signup-password"
          required
        />
      </Label>

      <Label>
        Quero vender
        <Input
          checked={ iWantToSell }
          onChange={ () => setiWantToSell(!iWantToSell) }
          type="checkbox"
        />
      </Label>

      <button
        type="submit"
        disabled={ validateRegister(name, email, password) }
      >
        Cadastrar
      </button>
    </Form>
  );
}
export default CreateUserForm;
