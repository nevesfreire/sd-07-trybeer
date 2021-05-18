import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import MainContainer from '../styled/ClientContainers.styled';
import { LiterallyAForm } from '../styled/FormStyle.styled';
import { MainButton } from '../styled/Buttons.styled';

function UpdateForm() {
  const { updateProfileName } = useFetch();
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [initialName, setInitialName] = useState('');
  const [responseAPI, setResponseAPI] = useState('');
  const [disabled, setDisabled] = useState(true);

  const getClient = () => {
    const client = JSON.parse(localStorage.getItem('user'));
    setUserEmail(client.email);
    setUserName(client.name);
    setInitialName(client.name);
  };

  const handleButtonChange = () => {
    if (userName !== initialName) {
      return setDisabled(false);
    }
    setDisabled(true);
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
    <MainContainer>
      {/* se for por essa tela na apresentação tira esse h1 */}
      <h1 data-testid="top-title">Meu perfil</h1>
      <LiterallyAForm>
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
        <MainButton
          type="button"
          data-testid="profile-save-btn"
          onClick={ () => handleClick() }
          disabled={ disabled }
        >
          Salvar
        </MainButton>
      </LiterallyAForm>
      <p>{ responseAPI }</p>
    </MainContainer>
  );
}

export default UpdateForm;
