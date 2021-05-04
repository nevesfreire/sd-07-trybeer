import React, { useContext, useState } from "react";
import ApiContext from "../../context/apiContext";
import { Form, Label, Input, Button, Span } from './styles'

// import "./styles.css";

// const handleSubmit = (evt) => {
//   evt.preventDefault();
// }

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(ApiContext)

  console.log({user})

  const onSubmitHandler = async () => {
    const user = {
      email,
      password,
    }
    //req da api enviando:
  };

  return (
    <Form >
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
      <Button type="submit">Entrar</Button>
    </Form>
  );
}
export default LoginForm;
