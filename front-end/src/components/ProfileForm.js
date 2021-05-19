import React, { useState } from 'react';
import { Form, Button } from 'react-bulma-components';
import services from '../services';
import { updateUser } from '../api';

const { Input, Field, Control, Label } = Form;

function ProfileForm() {
  const [inputName, setInputName] = useState('');
  const [notification, setNotification] = useState(true);

  const { email, name, role, token } = services.acessLocalStorage.getUserLocalStorage();

  const handleClick = async () => {
    const newUser = {
      email,
      name: inputName,
      role,
      token,
    };
    await updateUser({ name: inputName, email });
    services.acessLocalStorage.setUserLocalStorage(newUser);
    setNotification(false);
  };

  return (

    <div
      className="mt-6"
      style={ { maxWidth: '46rem', minWidth: '46rem', minHeight: '14rem', maxHeight: '14rem' } }>
      <h1 data-testid="top-title" style={ { color: 'White' } }>.</h1>
      <Field>
        <Label>
          Nome
        </Label>
        <Control>
          <Input
            placeholder={ name }
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
      <div
        hidden={ notification }
      >
        <p>
          Atualização concluída com sucesso
          <Button
            remove
            onClick={ () => setNotification(true) }
          />
        </p>
      </div>
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
    </div>

  );
}

export default ProfileForm;
