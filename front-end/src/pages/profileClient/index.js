import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { nameIsValid } from '../../service/validateInputs';
import TopMenu from '../../components/Header';
import { updateClient } from '../../service/trybeerApi';

export default function ProfileClient() {
  const data = JSON.parse(localStorage.getItem('user')) || { name: '', email: '' };
  const [text, setText] = useState();
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

  const handleClick = async () => {
    const TWO_THOUSAND = 2000;
    const newData = {
      ...data,
      name: profileInfo.name,
    };
    const result = await updateClient(newData.name, newData.email);
    if (result.error) {
      setText(result.error);
      return setTimeout(() => {
        setText();
      }, TWO_THOUSAND);
    }
    localStorage.setItem('user', JSON.stringify(newData));
    setText(result.message);

    setTimeout(() => {
      setText();
    }, TWO_THOUSAND);
  };

  return (
    <div>
      <TopMenu>Meu perfil</TopMenu>
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
      { text }
    </div>
  );
}
