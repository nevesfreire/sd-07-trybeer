import React from 'react';

export default function AdminProfile() {
  const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <form>
      <label htmlFor="profile-name">
        <span>Nome:</span>
        <span data-testid="profile-name" readOnly>
          { currentUser ? currentUser.name : '' }
        </span>
      </label>

      <label htmlFor="profile-email">
        Email:
        <span data-testid="profile-email" readOnly>
          { currentUser ? currentUser.email : '' }
        </span>
      </label>
    </form>
  );
}
