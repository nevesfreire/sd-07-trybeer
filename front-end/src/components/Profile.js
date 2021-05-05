import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchUpdateUser } from '../services/api';

function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [atualizado, setAtualizado] = useState(true);
  const [startingName, setStartingName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // melhor forma de definir se o usuário está logado?
    if (!user.name || !user.email) history.push('/login');
    setName(user.name);
    setEmail(user.email);
    setStartingName(user.name);
  }, [history]);

  const handleSubmit = async () => {
    const user = await fetchUpdateUser(name, email);
    if (user) {
      setAtualizado(false);
    } else { setAtualizado(true); }
  };

  return (
    <div>
      <header>
        <h1 data-testid="top-title">Perfil</h1>
      </header>
      <label htmlFor="profile">
        Nome
        <input
          className="name-input"
          data-testid="profile-name-input"
          type="text"
          name="name"
          id="name-profile"
          placeholder="Nome"
          value={ name }
          onChange={ (event) => setName(event.target.value) }
        />
      </label>

      <label htmlFor="email-profile">
        Email
        <input
          className="form-input"
          data-testid="profile-email-input"
          type="email"
          name="email"
          id="email-profile"
          placeholder="E-mail"
          value={ email }
          readOnly
        />
      </label>
      <button
        className="form-button"
        data-testid="profile-save-btn"
        type="button"
        disabled={ name !== startingName }
        onClick={ () => handleSubmit() }
      >
        Salvar
      </button>
      <h3 hidden={ atualizado }>Atualização concluída com sucesso</h3>
    </div>
  );
}

export default LoginForm;
