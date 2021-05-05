import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import TopBar from '../../Components/TopBar';
import verifyUserLocalStorage from '../../util/changeLocalStorage';
import { updateNameUser } from '../../servicesAPI/api';
// import PropTypes from 'prop-types';

const ClientProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [wasChange, setWasChange] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const history = useHistory();

  const HTTP_CODE_OK = 200;

  useEffect(() => {
    const { data } = verifyUserLocalStorage();
    if (!data) return history.push('/login');
    setUser({ name: data.name, email: data.email });
  }, [history]);

  const handleChange = ({ value }) => {
    const { data } = verifyUserLocalStorage();
    if (data.name !== value) {
      setWasChange(true);
    } else {
      setWasChange(false);
    }
    setUser({ ...user, name: value });
  };

  const updateName = async () => {
    const { data } = verifyUserLocalStorage();
    const response = await updateNameUser(user, data.token);
    if (response.status === HTTP_CODE_OK) {
      setShowMessage(true);
      localStorage.setItem('user',
        JSON.stringify({ data: { ...data, name: user.name } }));
    }
  };

  return (
    <div>
      <TopBar />
      <form>
        <label htmlFor="name">
          Nome
          <input
            value={ user.name }
            data-testid="profile-name-input"
            onChange={ ({ target }) => handleChange(target) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            readOnly
            data-testid="profile-email-input"
            type="email"
            value={ user.email }
          />
        </label>
        <button
          type="button"
          data-testid="profile-save-btn"
          disabled={ !wasChange }
          onClick={ updateName }
        >
          Salvar
        </button>
        { showMessage && <p>Atualização concluída com sucesso</p>}
      </form>
    </div>
  );
};

// ClientProfile.propTypes = {};

export default ClientProfile;
