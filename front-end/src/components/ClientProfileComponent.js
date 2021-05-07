import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import React, { useContext } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import BeerContext from '../context/BeerContext';
import MessageComponent from './MessageComponent';

function ClientProfileComponent({
  formData: { name, email },
  onInputChange,
  onHandleSubmit,
  validateInputs,
}) {
  const { errorMessage } = useContext(BeerContext);

  return (
    <Form size="large">
      <Segment stacked>
        <input
          fluid
          placeholder="Nome"
          value={ name }
          name="name"
          data-testid="profile-name-input"
          onChange={ (e) => onInputChange(e) }
        />
        {errorMessage && <MessageComponent>{errorMessage}</MessageComponent>}
        <input
          type="text"
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
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  validateInputs: PropTypes.func.isRequired,
};

export default ClientProfileComponent;
