import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

function ClientProfileComponent({
  formData: { name, email },
  onInputChange,
  onHandleSubmit,
  validateInputs,
}) {
  return (
    <Form size="large">
      <Segment stacked>
        <Form.Input
          fluid
          placeholder="Nome"
          value={ name }
          name="name"
          data-testid="profile-name-input"
          onChange={ (e) => onInputChange(e) }
        />
        <Form.Input
          fluid
          placeholder="E-mail"
          value={ email }
          name="email"
          data-testid="profile-email-input"
          onChange={ (e) => onInputChange(e) }
          readOnly
        />
        <Button
          color="blue"
          fluid
          size="large"
          data-testid="profile-save-btn"
          disabled={ validateInputs() }
          onClick={ () => onHandleSubmit() }
        >
          Salvar
        </Button>
      </Segment>
    </Form>
  );
}

ClientProfileComponent.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  validateInputs: PropTypes.func.isRequired,
};

export default ClientProfileComponent;
