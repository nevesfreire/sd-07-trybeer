import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { nameIsValid } from '../../service/validateInputs';

export default function ProfileClient() {
  const data = JSON.parse(localStorage.getItem('user'));
  const [profileInfo, setProfileInfo] = useState({
    name: data.name,
    email: data.email,
  });

  if (!data.token) return <Redirect to="/login" />;

  const verifyInput = () => {
    const { name } = profileInfo;
    return name !== data.name && nameIsValid(name);
  };

  const handleChange = ({ target: { name, value } }) => {
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  const handleClick = () => {
    const newData = {
      ...data,
      name: profileInfo.name,
    };
    localStorage.setItem('user', JSON.stringify(newData));
  };

  return (
    <div>
      <h1 data-testid="top-title">Perfil</h1>
      <label htmlFor="name">
        Nome:
        <input
          id="name"
          name="name"
          type="text"
          value={ profileInfo.name }
          onClick={ () => setProfileInfo({ ...profileInfo, name: '' }) }
          data-testid="profile-name-input"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="email">
        Email:
        <input
          id="email"
          name="email"
          type="text"
          value={ profileInfo.email }
          readOnly
          data-testid="profile-email-input"
        />
      </label>
      <button
        type="button"
        data-testid="profile-save-btn"
        disabled={ !verifyInput() }
        onClick={ handleClick }
      >
        Salvar
      </button>
    </div>
  );
}
