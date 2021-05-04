import React, { useState } from "react";
import { Form, Label, Input, Button, Span } from './styles'

// const handleSubmit = (evt) => {
//   evt.preventDefault();
// }

function CreateUserForm() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [iWantToSell, setiWantToSell] = useState("");

  return (
    <Form>
      <Label>
        Nome
        <Input
          // value={name}
          // onChange={e => setName(e.target.value)}
          // placeholder="name"
          type="text"
          name="name"
          required
        />
      </Label>
     
      <Label>
        Email
        <Input
          // value={email}
          // onChange={e => setEmail(e.target.value)}
          // placeholder="Email address"
          type="email"
          name="email"
          required
        />
      </Label>

      <Label>
        Senha
        <Input
          // value={password}
          // onChange={e => setPassword(e.target.value)}
          // placeholder="Password"
          type="password"
          name="password"
          required
        />
      </Label>

      <Label>Quero vender
        <Input
          // checked={iWantToSell}
          // onChange={() => setiWantToSell(!iWantToSell)}
          type="checkbox"
        />
      </Label>

      <button type="submit">Cadastrar</button>
    </Form>
  );
}
export default CreateUserForm;
