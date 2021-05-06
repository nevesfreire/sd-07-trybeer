import React from 'react';

function ProfileAdmin() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Perfil</h1>
      <p data-testid="profile-name">
        Name:
        {user.name}
      </p>
      <p data-testid="profile-email">
        Email:
        {user.email}
      </p>
    </div>
  );
}

export default ProfileAdmin;
