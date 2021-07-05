import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { ClientMenu } from '../../components';
import api from '../../services/api';

import './styles.css';

function Profile() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user')) || { name: null, role: null };

  const history = useHistory();

  useEffect(() => {
    if (!user.name) history.push('/login');
    if (user.role === 'administrator') history.push('/admin/profile');
  }, [history, user, user.name]);

  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.updateUser(name, user.token);
    localStorage.setItem('user', JSON.stringify({ ...user, name }));
    setMessage('Atualização concluída com sucesso');
  };

  return (
    <section className="profile-wrapper">
      <ClientMenu />
      <form className="form-wrapper" onSubmit={ (e) => handleSubmit(e) }>
        <div className="form-container">
          <h1 data-testid="top-title">Meu perfil</h1>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              id="name"
              data-testid="profile-name-input"
              value={ name }
              onChange={ ({ target }) => setName(target.value) }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              readOnly
              data-testid="profile-email-input"
              value={ user.email }
            />
          </label>
          <button
            type="submit"
            data-testid="profile-save-btn"
            disabled={ name === user.name ? 'disabled' : '' }
          >
            Salvar
          </button>
          <p>{ message }</p>
        </div>
      </form>
    </section>
  );
}

export default Profile;
