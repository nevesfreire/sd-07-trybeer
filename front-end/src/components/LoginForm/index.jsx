import React, { useContext, useState } from "react";
import { Redirect } from 'react-router-dom';
import ApiContext from "../../context/apiContext";
import {
  Form,
  Label,
  Input,
  Button,
  Span,
  RegisterButton,
} from './styles'


// import "./styles.css";

// const handleSubmit = (evt) => {
//   evt.preventDefault();
// }

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userLogin } = useContext(ApiContext)

  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    }
    //req da api enviando:
    const response = await userLogin(user);
    localStorage.setItem('user', JSON.stringify(response));
    if(response) {
      const { role } = response;
      if (role === 'administrator') {
        return <Redirect to="/admin/orders" /> 
      } 
      return <Redirect to="/products" />
    }
  };

  return (
    <Form onSubmit={ onSubmitHandler }>
      <Label>
        Email
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          value={password}
          onChange={e => setPassword(e.target.value)}
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
      >
        Entrar
      </Button> 
      <RegisterButton
        to="/register"
        data-testid="no-account-btn"
      >
        ou registre-se
      </RegisterButton>
    </Form>
  );
}
export default LoginForm;
