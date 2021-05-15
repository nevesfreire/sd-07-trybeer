import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Segment, Divider, Label } from 'semantic-ui-react';
import CentralContext from '../context/Context';

import 'semantic-ui-css/semantic.min.css';

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
      <Segment stacked style={ { backgroundColor: 'rgb(33, 33, 33)' } }>
        {/* <Label circular color="orange" leftFloating>
          Nome
        </Label> */}
        <Form.Input
          data-testid="signup-name"
          fluid
          icon="user"
          iconPosition="left"
          // label="Nome"
          placeholder="Name"
          value={ name }
          name="name"
          onChange={ (e) => onInputChange(e) }
        />

        {/* <Label circular color="orange" leftFloating>
          Email
        </Label> */}
        <Form.Input
          data-testid="signup-email"
          fluid
          // label="Email"
          icon="at"
          iconPosition="left"
          placeholder="E-mail address"
          value={ email }
          name="email"
          onChange={ (e) => onInputChange(e) }
        />

        {/* <Label circular color="orange" leftFloating>
          Senha
        </Label> */}
        <Form.Input
          data-testid="signup-password"
          fluid
          icon="lock"
          iconPosition="left"
          // label="Senha"
          placeholder="Password"
          value={ password }
          type="password"
          name="password"
          onChange={ (e) => onInputChange(e) }
        />
        <Divider />

        <Label color="orange" htmlFor="signup-seller">
          Quero vender
          <input
            data-testid="signup-seller"
            id="signup-seller"
            type="checkbox"
            label="Quero vender"
            name="iWantToSell"
            value={ iWantToSell }
            onChange={ (e) => onInputChange(e) }
          />
        </Label>
        <Divider />
        <Button
          data-testid="signup-btn"
          color="orange"
          fluid
          size="large"
          onClick={ () => onHandleSubmit() }
          disabled={ isValid() }
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

SignUpForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    iWantToSell: PropTypes.bool,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  isValid: PropTypes.func.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,

};

export default SignUpForm;
