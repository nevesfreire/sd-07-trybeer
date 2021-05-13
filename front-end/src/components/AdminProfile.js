import React from 'react';

export default function ClientProfile() {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <form>
      <label>
        <h1>Nome:</h1>
        <input
          value={ currentUser.name }
          type="name"
          name="name"
          data-testid="profile-name"
          readOnly
        />
      </label>

      <label>
        Email:
        <input
          value={ currentUser.email }
          type="email"
          name="email"
          data-testid="profile-email"
          readOnly
        />
      </label>
    </form>
  );
}
