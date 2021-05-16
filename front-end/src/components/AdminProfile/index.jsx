import React from 'react';

export default function AdminProfile() {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <form
    style={ { width: '50vh' } }
    className="d-flex flex-column form-group"
    >
      <label htmlFor="profile-name">
        <span>Nome</span>
        <span data-testid="profile-name"
        readOnly
        className ="form-control"
        >
          { currentUser ? currentUser.name : '' }
        </span>
      </label>

      <label htmlFor="profile-email"
      style={ { marginTop: '2vh' } }
      >
        Email
        <span data-testid="profile-email"
        readOnly
        className ="form-control"
        >
          { currentUser ? currentUser.email : '' }
        </span>
      </label>
    </form>
  );
}
