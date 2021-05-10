import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

function UpdateForm() {
  const { updateProfileName } = useFetch();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [initialName, setInitialName] = useState('');
  const [responseAPI, setResponseAPI] = useState('');
  const [disabled, setDisabled] = useState(true);

  const getClient = () => {
    const client = JSON.parse(localStorage.getItem('user'));
    console.log(client);
    setUserEmail(client.email);
    setUserName(client.name);
    setInitialName(client.name);
  };

  const handleButtonChange = () => {
    if (userName !== initialName) {
      return setDisabled(false)
    } else { setDisabled(true) }
  };

  useEffect(() => {
    handleButtonChange();
  }, [userName]);

  useEffect(() => {
    getClient();
  }, []);

  const handleClick = async () => {
    const client = JSON.parse(localStorage.getItem('user'));
    const { email, role, token } = client;
    const response = await updateProfileName(userName, userEmail, token);
    if (response === 'Atualização concluída com sucesso') {
      const newUser = {
        email,
        name: userName,
        role,
        token,
      };

      localStorage.setItem('user', JSON.stringify(newUser));
    }
    setResponseAPI(Object.values(response));
    return response;
  };

  return (
    <div>
      <h1 data-testid="top-title">Meu perfil</h1>
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="name"
            name="name"
            data-testid="profile-name-input"
            value={ userName }
            onChange={ ({ target }) => setUserName(target.value) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid="profile-email-input"
            value={ userEmail }
            name={ userEmail }
            readOnly
          />
        </label>
        <button
          type="button"
          data-testid="profile-save-btn"
          onChange={() => handleButtonChange()}
          onClick={ () => handleClick() }
          disabled={ disabled }
        >
          Salvar
        </button>
      </form>
      <p>{ responseAPI }</p>
    </div>
  );
}

export default UpdateForm;
