import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import userLogin from '../../services/apiService';
import validateLogin from './validationLogin';
import {
  Form,
  Label,
  Input,
  Button,
  Span,
  RegisterButton,
} from './styles';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userRole, setRole] = useState(null);

  // const { userLogin } = useContext(ApiContext);
  const history = useHistory();

  const onSubmitHandler = (e, user) => {
    e.preventDefault();
    // const user = {
    //   email,
    //   password,
    // };
    // req da api enviando:
    return userLogin(user).then((apiResponse) => {
      localStorage.setItem('user', JSON.stringify(apiResponse));
      console.log(`Console log do apiResponse: ${apiResponse}`);
      console.log(`Console log do role: ${apiResponse.role}`);
      if (apiResponse.role === 'administrator') {
        history.push('/admin/orders');
      }

      if (apiResponse.role === 'client') {
        history.push('/products');
      }
    });
  };

  return (
    <Form>
      {console.log('Entrou!')}
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
        onClick={ (e) => onSubmitHandler(e, { email, password }) }
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
