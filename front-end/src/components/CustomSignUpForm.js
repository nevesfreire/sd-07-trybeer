import "semantic-ui-css/semantic.min.css";
import React, { useEffect, useContext } from "react";
import CentralContext from '../context/Context';
import { Button, Form, Segment, Checkbox, Divider } from "semantic-ui-react";

const SignUpForm = ({
  formData: { name, email, password, iWantToSell },
  onInputChange,
  onHandleSubmit,
  isValid,
}) => {
  const { isExistEmail } = useContext(CentralContext);
  useEffect(() => {}, [isExistEmail]);
  return (
    <Form size="large">
      <Segment stacked>
        <Form.Input
          data-testid="signup-name"
          fluid
          label="Nome"
          placeholder="Name"
          value={name}
          name="name"
          onChange={(e) => onInputChange(e)}
        />
        <Form.Input
          data-testid="signup-email"
          fluid
          label="Email"
          placeholder="E-mail address"
          value={email}
          name="email"
          onChange={(e) => onInputChange(e)}
        />
        <Form.Input
          data-testid="signup-password"
          fluid
          label="Senha"
          placeholder="Password"
          value={password}
          type="password"
          name="password"
          onChange={(e) => onInputChange(e)}
        />
        <Divider></Divider>
        <label htmlFor="signup-seller">Quero vender</label>
        <input
          data-testid="signup-seller"
          type="checkbox"
          label="Quero vender"
          name="iWantToSell"
          value={iWantToSell}
          onChange={(e) => onInputChange(e)}
        />
        <Divider></Divider>
        <Button
          data-testid="signup-btn"
          color="orange"
          fluid
          size="large"
          onClick={async () => await onHandleSubmit()}
          disabled={isValid()}
        >
          Cadastrar
        </Button>

        {!isExistEmail ? null : (
          <span>Já existe um usuário com esse e-mail.</span>
        )}
      </Segment>
    </Form>
  );
};
export default SignUpForm;
