import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

const CustomLogin = ({
  formData: { email, password },
  onInputChange,
  onHandleSubmit,
  goRegister,
  isValid,
}) => (
  <Form size="large">
    <Segment stacked>
      <Form.Input
        data-testid="email-input"
        fluid
        icon="user"
        iconPosition="left"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => onInputChange(e)}
      />
      <Form.Input
        data-testid="password-input"
        fluid
        icon="lock"
        iconPosition="left"
        placeholder="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => onInputChange(e)}
      />

      <Button
        data-testid="signin-btn"
        color="orange"
        fluid
        size="large"
        onClick={ async () => await onHandleSubmit()}
        // disabled={ isValid ? 'false' : 'true' }
      >
        Login
      </Button>
    </Segment>
    <Button
      data-testid="signin-btn"
      inverted
      color="orange"
      onClick={ async () => await goRegister()}
      animated="fade"
    >
      <Button.Content visible>Ainda não tenho conta</Button.Content>
      <Button.Content hidden>Cadastrar</Button.Content>
    </Button>
  </Form>
);

export default CustomLogin;
