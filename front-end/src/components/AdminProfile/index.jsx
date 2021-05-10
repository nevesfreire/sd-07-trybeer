import React from 'react';
import {
  Form,
  Label,
  Span,
} from './styles';

export default function AdminProfile() {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Form>
      <Label>
        <Span>Nome:</Span>
        <span data-testid="profile-name" readOnly>
          { currentUser ? currentUser.name : '' }
        </span>
      </Label>

      <Label>
        Email:
        <span data-testid="profile-email" readOnly>
          { currentUser ? currentUser.email : '' }
        </span>
      </Label>
    </Form>
  );
}
