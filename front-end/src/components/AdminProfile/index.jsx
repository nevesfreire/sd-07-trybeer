import React from 'react';
import {
  Form,
  Label,
  Input,
  Span,
} from './styles';

export default function ClientProfile() {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Form>
      <Label>
        <Span>Nome:</Span>
        <Input
          value={ currentUser.name }
          type="name"
          name="name"
          data-testid="profile-name"
          readOnly
        />
      </Label>

      <Label>
        Email:
        <Input
          value={ currentUser.email }
          type="email"
          name="email"
          data-testid="profile-email"
          readOnly
        />
      </Label>
    </Form>
  );
}
