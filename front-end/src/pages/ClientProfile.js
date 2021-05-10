import React, { useState } from 'react';
import { Form, Button } from 'react-bulma-components';
import services from '../services';

const { Input, Field, Control, Label } = Form;
function ClientProfile() {
  const [inputName, setInputName] = useState('');
  const { email, role, token } = services.getUserLocalStorage();
  const handleClick = async () => {
    const newUser = {
      email,
      inputName,
      role,
      token,
    };
    services.setUserLocalStorage(newUser);
  };

  return (
    <>
      {/* h1 so para passar no test req 4. Falta Header */}
      <h1
        data-testid="top-title"
      >
        Meu perfil
      </h1>

      <Field>
        <Label>
          Nome
        </Label>
        <Control>
          <Input
            onChange={ (e) => setInputName(e.target.value) }
            data-testid="profile-name-input"
          />
        </Control>
      </Field>

      <Field>
        <Label>
          Email
        </Label>
        <Control>
          <Input
            data-testid="profile-email-input"
            type="text"
            value={ email }
            readOnly
          />
        </Control>
      </Field>

      <Field>
        <Control>
          <Button
            onClick={ () => handleClick() }
            data-testid="profile-save-btn"
            disabled={ !inputName }
          >
            Salvar
          </Button>
        </Control>
      </Field>
    </>
  );
}

export default ClientProfile;
