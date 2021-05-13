import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Segment } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

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
        label="Email"
        placeholder="Email"
        name="email"
        value={ email }
        onChange={ (e) => onInputChange(e) }
      />
      <Form.Input
        data-testid="password-input"
        fluid
        icon="lock"
        iconPosition="left"
        label="Senha"
        placeholder="Senha"
        type="password"
        name="password"
        value={ password }
        onChange={ (e) => onInputChange(e) }
      />
      <button
        data-testid="signin-btn"
        color="orange"
        fluid
        size="large"
        onClick={ () => onHandleSubmit() }
        disabled={ isValid() }
      >
        Entrar
      </button>
    </Segment>
    <Button
      data-testid="no-account-btn"
      inverted
      color="orange"

      onClick={ () => goRegister() }

      animated="fade"
    >
      <Button.Content visible>Ainda não tenho conta</Button.Content>
      <Button.Content hidden>Cadastrar</Button.Content>
    </Button>
  </Form>
);

CustomLogin.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    iWantToSell: PropTypes.bool,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  isValid: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  goRegister: PropTypes.func.isRequired,

};

export default CustomLogin;
