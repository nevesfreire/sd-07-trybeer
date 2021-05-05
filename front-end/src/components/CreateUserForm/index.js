import React, { useState } from 'react';
import { Form, Label, Input, Button, Span } from './styles';

// const handleSubmit = (evt) => {
//   evt.preventDefault();
// }

function CreateUserForm() {
  // Estados de campos
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [iWantToSell, setiWantToSell] = useState(false);

  const validateRegister = (name, email, password) => {
    const specialCharReg = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    const NAME_MIN_LENGTH = 12;
    const PASSWORD_MIN_LENGTH = 6;

    if (!name || name.length < NAME_MIN_LENGTH || specialCharReg.test(name)) {
      console.log('problema em name');
      return true;
    }
    if (!password || password.length < PASSWORD_MIN_LENGTH) {
      console.log('problema em password');
      return true;
    }
    if (!email) {
      return true;
    }
    return false;
  };

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
          data-testid="name-input"
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
          data-testid="email-input"
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
          data-testid="password-input"
          required
        />
      </Label>

      <Label>
        Quero vender
        <Input
          checked={ iWantToSell }
          onChange={ () => setiWantToSell(!iWantToSell) }
          type="checkbox"
          data-testid="iWantToSell-input"
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
