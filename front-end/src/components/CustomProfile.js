import 'semantic-ui-css/semantic.min.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Segment } from 'semantic-ui-react';

const CustomPerfil = ({
  email: emailL,
  name: nameL,
  btnEnable,
  txtEnable,
  stateBtn,
  uptName,
  onInputChange,
  formDataUpdate: { email, name },
}) => {
  useEffect(() => {}, [btnEnable]);
  useEffect(() => {}, [txtEnable]);

  return (
    <Form size="large">
      <Segment stacked>
        <Form.Input
          data-testid="profile-email-input"
          fluid
          icon="mail"
          iconPosition="left"
          label="Email"
          placeholder={ emailL }
          name="email"
          readOnly
          value={ email }
        />
        <Form.Input
          data-testid="profile-name-input"
          fluid
          icon="user"
          iconPosition="left"
          label="Nome"
          placeholder={ nameL }
          type="text"
          name="name"
          value={ name }
          onChange={ (e) => {
            onInputChange(e);
            stateBtn();
          } }
        />

        <Button
          data-testid="profile-save-btn"
          color="orange"
          fluid
          size="large"
          onClick={ () => uptName(email, name) }
          disabled={ btnEnable }
        >
          Salvar
        </Button>
        {txtEnable ? null : <span>Atualização concluída com sucesso</span>}
      </Segment>
    </Form>
  );
};

CustomPerfil.propTypes = {
  email: PropTypes.string.isRequired,
  btnEnable: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  txtEnable: PropTypes.bool.isRequired,
  stateBtn: PropTypes.func.isRequired,
  uptName: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  formDataUpdate: PropTypes.func.isRequired,
};

export default CustomPerfil;
