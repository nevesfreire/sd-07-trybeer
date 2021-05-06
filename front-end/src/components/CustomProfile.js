import "semantic-ui-css/semantic.min.css";
import React, { useEffect } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const CustomPerfil = ({
  email: emailL,
  name: nameL,
  btnEnable,
  txtEnable,
  stateBtn,
  stateTxt,
  uptName,
  onInputChange,
  formDataUpdate: { email, name },
}) => {
  let buttonEnable = false;
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
          placeholder={emailL}
          name="email"
          readonly
          value={email}
        />
        <Form.Input
          data-testid="profile-name-input"
          fluid
          icon="user"
          iconPosition="left"
          label="Nome"
          placeholder={nameL}
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            onInputChange(e);
          }}
        />

        {/* {console.log(isValid())} */}
        <Button
          data-testid="profile-save-btn"
          color="orange"
          fluid
          size="large"
          onClick={() => uptName(email, name)}
          // disabled={btnEnable}
        >
          Salvar
        </Button>
        {txtEnable ? null : <span>Atualização concluída com sucesso</span>} 
      </Segment>
    </Form>
  );
};

export default CustomPerfil;
