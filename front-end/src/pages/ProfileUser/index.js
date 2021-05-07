import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { updateNameFetch } from '../../services/index';

export default function ProfileUser() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [alertController, setAlertController] = useState(false);

  const history = useHistory();

  const timeoutMessage = 5000;

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser === null) {
      history.push('/login');
    } else {
      const { name: localName, email: localEmail } = localStorageUser;
      setEmail(localEmail);
      setName(localName);
    }
  }, [history]);

  const handleUpdateMessage = async () => {
    setAlertController(true);
    await setTimeout(() => {
      setAlertController(false);
    }, timeoutMessage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateNameFetch(name, email);
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    localStorageUser.name = name;
    localStorage.setItem('user', JSON.stringify(localStorageUser));
    await handleUpdateMessage();
  };

  const inputValidation = () => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser === null) {
      history.push('/login');
    } else if (localStorageUser.name === name) {
      return true;
    }
  };

  return (
    <main>
      <Form className="form__login">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            data-testid="profile-name-input"
            type="Name"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control
            readOnly
            data-testid="profile-email-input"
            type="email"
            value={ email }
          />
        </Form.Group>
        <Button
          data-testid="profile-save-btn"
          variant="primary"
          type="button"
          className="form__login__btn"
          onClick={ (event) => handleSubmit(event) }
          disabled={ inputValidation() }
        >
          Salvar
        </Button>
        { alertController && <p>Atualização concluída com sucesso</p> }
      </Form>
    </main>
  );
}
