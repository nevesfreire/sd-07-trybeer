import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Register() {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('client');
  const [isDisable, setIsDisable] = useState(true);
  const [forClient, setForClient] = useState(false);
  const [forAdm, setForAdm] = useState(false);
  const [userCad, setUserCad] = useState(false);
  const history = useHistory();
  const verifyData = () => {
    const six = 6;
    const doze = 12;
    const regex = /\S+@\S+\.\S+/;
    const regex2 = /^[a-z\s]+$/i;
    if (regex2.test(newName)
      && newName.length >= doze
      && regex.test(newEmail)
      && newPassword.length >= six) setIsDisable(false);
    else setIsDisable(true);
  };
  const saveInLocalStorage = (data) => {
    window.localStorage.setItem('cadUser', data.newRole);
    const role = localStorage.getItem('cadUser');
    if (role === 'client') setForClient(true);
    if (role === 'administrator') setForAdm(true);
  };
  const handleSubmit = async () => {
    const err = 'Já existe um usuário com esse e-mail.';
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ newName, newEmail, newPassword, newRole }),
    }).then((response) => response.json())
      .then((data) => {
        if (data === err) {
          return setUserCad(true);
        }
        saveInLocalStorage(data);
      });
  };
  useEffect(() => {
    verifyData();
  }, [newName, newEmail, newPassword, newRole, verifyData]);
  return (
    <div>
      <label
        htmlFor="signup-name"
      >
        Nome
        <input
          type="text"
          data-testid="signup-name"
          name="name"
          autoComplete="off"
          className="inputRegister"
          value={ newName }
          min="12"
          onChange={ ({ target }) => setNewName(target.value) }
        />
      </label>
      <label
        htmlFor="signup-email"
      >
        Email
        <input
          type="email"
          data-testid="signup-email"
          name="email"
          autoComplete="off"
          className="inputRegister"
          value={ newEmail }
          onChange={ ({ target }) => setNewEmail(target.value) }
        />
      </label>
      <label
        htmlFor="signup-password"
      >
        Senha
        <input
          type="password"
          data-testid="signup-password"
          name="password"
          value={ newPassword }
          onChange={ ({ target }) => setNewPassword(target.value) }
        />
      </label>
      <label
        htmlFor="signup-seller"
      >
        Quero vender
        <input
          onClick={ () => setNewRole('administrator') }
          type="checkbox"
          data-testid="signup-seller"
          name="seller"
          value={ newRole }
        />
      </label>
      <button
        type="button"
        data-testid="signup-btn"
        disabled={ isDisable }
        onClick={ handleSubmit }
      >
        Cadastrar
      </button>
      { forClient && history.push('/products') }
      { forAdm && history.push('/admin/orders') }
      { userCad && <h3>Já existe um usuário com esse e-mail.</h3>}
    </div>
  );
}
export default Register;
