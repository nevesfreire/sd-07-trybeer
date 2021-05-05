import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import React, { useState } from 'react';
import { Button, Form, Segment, Checkbox } from 'semantic-ui-react';

function RegisterComponent({
  formData: { name, email, password },
  onInputChange,
  onHandleSubmit,
  validateInputs,
}) {
  const [unchecked, setUnchecked] = useState(false);
  return (
    <Form size="large">
      <Segment stacked>
        <Form.Input
          fluid
          placeholder="Nome"
          value={ name }
          name="name"
          data-testid="signup-name"
          onChange={ (e) => onInputChange(e) }
        />
        <Form.Input
          fluid
          placeholder="E-mail"
          value={ email }
          name="email"
          data-testid="signup-email"
          onChange={ (e) => onInputChange(e) }
        />
        <Form.Input
          fluid
          placeholder="Senha"
          value={ password }
          type="password"
          name="password"
          data-testid="signup-password"
          onChange={ (e) => onInputChange(e) }
        />
        <Button
          color="blue"
          fluid
          size="large"
          data-testid="signup-btn"
          disabled={ validateInputs() }
          onClick={ () => onHandleSubmit() }
        >
          Cadastrar
        </Button>
        <Checkbox
          name="checked"
          label="Quero vender"
          data-testid="signup-seller"
          defaultChecked={ unchecked }
          onChange={ (e, data) => {
            setUnchecked(!unchecked);
            onInputChange({ target: { name: data.name, value: data.checked } });
          } }
        />
      </Segment>
    </Form>
  );
}

RegisterComponent.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  validateInputs: PropTypes.func.isRequired,
};

export default RegisterComponent;
