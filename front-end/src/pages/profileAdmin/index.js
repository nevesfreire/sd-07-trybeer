import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import TopMenu from '../../components/Header';

export default function ProfileAdmin() {
  const data = JSON.parse(localStorage.getItem('user')) || { name: '', email: '' };
  const [profileInfo] = useState({
    name: data.name,
    email: data.email,
  });

  if (!data.token) return <Redirect to="/login" />;

  return (
    <div>
      <TopMenu>Perfil</TopMenu>
      <p data-testid="profile-name">{`Nome:${profileInfo.name}`}</p>
      <p data-testid="profile-email">{`Nome:${profileInfo.email}`}</p>
    </div>
  );
}
