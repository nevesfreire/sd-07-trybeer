import React, { useState } from 'react';
import { updateUser } from '../../services/apiServices.js';
import profileValidation from './profileValidation.js';

export default function ClientProfile() {
  const [name, setName] = useState('');
  const [nameUpdate, setNameUpdate] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email: currentUser.email,
    };
    // req da api enviando:
    const response = await updateUser(user).then((apiResponse) => apiResponse);

    if (response) setNameUpdate(true);
  };

  return (
    <Form onSubmit={ onSubmitHandler }>
      <Label>
        <Span>Name</Span>
        <Input
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          type="name"
          name="name"
          data-testid="profile-name-input"
          required
        />
      </Label>

      <Label>
        Email
        <Input
          value={ currentUser.email }
          type="email"
          name="email"
          data-testid="profile-email-input"
          readOnly
        />
      </Label>

      <Button
        type="submit"
        data-testid="profile-save-btn"
        disabled={ profileValidation(name) }
      >
        Salvar
      </Button>

      { nameUpdate && <span>Atualização concluída com sucesso</span> }
    </Form>
  );
}
