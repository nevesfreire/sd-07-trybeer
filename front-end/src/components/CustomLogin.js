import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Segment, Image, Transition } from 'semantic-ui-react';
// import CustomHeader from './CustomHeader';

import logo from '../assets/images/logo-beer-2.png';

const CustomLogin = ({
  formData: { email, password },
  onInputChange,
  onHandleSubmit,
  goRegister,
  isValid,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div>
      {/* <CustomHeader message="Trybeer" /> */}
      <Transition.Group animation="browse" duration="2000" alt="logo-trybeer">
        {visible && (
          <Image centered size="small" src={ logo } />
        )}
      </Transition.Group>

      <Transition.Group animation="browse" duration="1000" alt="logo-trybeer">
        {visible && (
          <Form size="large">
            <Segment stacked style={ { backgroundColor: 'rgb(33, 33, 33)' } } basic>
              {/* <Label pointing="below">Email</Label> */}
              <Form.Input
                data-testid="email-input"
                fluid
                icon="at"
                iconPosition="left"
                // label="Email"
                placeholder="Email"
                name="email"
                value={ email }
                onChange={ (e) => onInputChange(e) }
              />
              {/* <Label pointing="below">Senha</Label> */}
              <Form.Input
                data-testid="password-input"
                fluid
                icon="lock"
                iconPosition="left"
                // label="Senha"
                placeholder="Senha"
                type="password"
                name="password"
                value={ password }
                onChange={ (e) => onInputChange(e) }
              />
              <Button
                type="submit"
                data-testid="signin-btn"
                color="orange"
                fluid
                size="large"
                onClick={ () => onHandleSubmit() }
                disabled={ isValid() }
              >
                Entrar
              </Button>
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
        )}
      </Transition.Group>
    </div>
  );
};

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
