import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ApiContext from '../../context/apiContext';
import validationClientProfile from './validationClientProfile';
import {
  Form,
  Label,
  Input,
  Button,
  Span,
} from './styles';

// const menuTitle = "Meu Perfil";

function ClientProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setRole] = useState(null);
  const { userLogin } = useContext(ApiContext);

  // const currentUser = JSON.parse(localStorage.getItem('user'));

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const user = {
      name,
    };
    // req da api enviando:
    return userLogin(user)
      .then((apiResponse) => {
        localStorage.setItem('user', JSON.stringify(apiResponse));
        if (apiResponse) {
          const { role } = apiResponse;
          setRole(role);
          console.log('role', role);
        }
      });
  };

  if (userRole && userRole === 'administrator') {
    return <Redirect to="/admin/orders" />;
  }

  if (userRole && userRole === 'client') {
    return <Redirect to="/products" />;
  }

  return (
    <Form onSubmit={ onSubmitHandler }>
      <Label>
        <Span>Name</Span>
        <Input
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          placeholder="name"
          type="name"
          name="name"
          data-testid="profile-name-input"
          required
        />
      </Label>

      <Label>
        Email
        <Input
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Email address"
          type="email"
          name="email"
          data-testid="profile-email-input"
          readonly
        />
      </Label>

      <Button
        type="submit"
        data-testid="profile-save-btn"
        disabled={ validationClientProfile(name) }
      >
        Salvar
      </Button>

    </Form>
  );
}
export default ClientProfile;
