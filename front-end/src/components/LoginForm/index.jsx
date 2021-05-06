import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ApiContext from '../../context/apiContext';
import validateLogin from './validationLogin';
import {
  Form,
  Label,
  Input,
  Button,
  Span,
  RegisterButton,
} from './styles';

// import "./styles.css";

// const handleSubmit = (evt) => {
//   evt.preventDefault();
// }

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setRole] = useState(null);

  const { userLogin } = useContext(ApiContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    // req da api enviando:
    return userLogin(user)
      .then((apiResponse) => {
        localStorage.setItem('user', JSON.stringify(apiResponse));
        if (response) {
          const { role } = apiResponse;
          setRole(role);
          console.log('role', role);
        }
      });
  };

  if (userRole && userRole === 'administrator') {
    return <Redirect to="/admin/orders" />;
  }

  if (userRole && userRole === 'client') {
    return <Redirect to="/products" />;
  }

  return (
    <Form onSubmit={ onSubmitHandler }>
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
        <Span>Senha</Span>
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
      <Button
        type="submit"
        data-testid="signin-btn"
        disabled={ validateLogin(email, password) }
      >
        Entrar
      </Button>
      <RegisterButton
        to="/register"
        data-testid="no-account-btn"
      >
        Ainda não tenho conta
      </RegisterButton>
    </Form>
  );
}
export default LoginForm;
