import React from 'react';
import { Form } from 'react-bootstrap';

export default function AdminProfile() {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Form
    style={ { width: '50vh' } }
    className="d-flex flex-column form-group"
    >
      <Form.Label htmlFor="profile-name">
        <span>Nome</span>
        <span data-testid="profile-name"
        readOnly
        className ="form-control"
        >
          { currentUser ? currentUser.name : '' }
        </span>
      </Form.Label>

      <Form.Label htmlFor="profile-email"
      style={ { marginTop: '2vh' } }
      >
        Email
        <span data-testid="profile-email"
        readOnly
        className ="form-control"
        >
          { currentUser ? currentUser.email : '' }
        </span>
      </Form.Label>
    </Form>
  );
}
