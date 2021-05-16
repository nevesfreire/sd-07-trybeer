import React, { useState } from 'react';
import { updateUser } from '../../services/apiService';
import { Form, Button } from 'react-bootstrap';
import validationClientProfile from './validationClientProfile';

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
    const response = await updateUser(currentUser.token, user)
      .then((apiResponse) => apiResponse);

    if (response) setNameUpdate(true);
  };

  return (
    <Form onSubmit={ onSubmitHandler }
    style={ { width: '50vh' } }
    className="d-flex flex-column form-group">
      <Form.Label htmlFor="profile-name-input">
        <span>Nome</span>
        <Form.Control
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          type="name"
          name="name"
          data-testid="profile-name-input"
          required
        />
      </Form.Label>

      <Form.Label htmlFor="profile-email-input"
      style={ { marginTop: '1vh' } }
      >
        Email
        <Form.Control
          value={ currentUser.email }
          type="email"
          name="email"
          data-testid="profile-email-input"
          readOnly
        />
      </Form.Label>

      <Button
        type="submit"
        data-testid="profile-save-btn"
        disabled={ validationClientProfile(name) }
        style={ { marginTop: '2vh' } }
      >
        Salvar
      </Button>

      { nameUpdate && <span>Atualização concluída com sucesso</span> }
    </Form>
  );
}
