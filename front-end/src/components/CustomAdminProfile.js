import React from 'react';
import { Container, Header, Button, Table, Segment, Card } from 'semantic-ui-react';

import { getToken } from '../helpers/localStorage';

const CustomAdminProfile = () => {
  const token = getToken();
  const { name, email } = token;
  return (
    <Container style={{ padding: 20, marginTop: 40, fontSize: '2rem' }}>
      <Header >Perfil</Header>
      <p data-testid="profile-name">{`Nome: ${name}`}</p>
      <p data-testid="profile-email">{`Email: ${email}`}</p>
    </Container>
  );
};

export default CustomAdminProfile;
