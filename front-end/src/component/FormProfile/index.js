import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getToLocalStorage } from '../../utils/localStorage';
import { requestAlterUserAPI } from '../../services';

const FormDefault = {
  name: '',
  email: '',
};
function FormProfile() {
  const [formProfile, setFormProfile] = useState(FormDefault);
  const [sucessState, setSucessState] = useState(false);
  const [alterState, setAlterState] = useState(true);
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormProfile({ ...formProfile, [name]: value });
    setAlterState(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await requestAlterUserAPI(formProfile);
    if (user.data) {
      setSucessState(true);
    }
  };

  useEffect(() => {
    try {
      const { name, email } = getToLocalStorage('user');

      setFormProfile({ name, email });
    } catch (error) {
      history.push('/');
    }
  }, [history]);

  return (
    <>
      <label htmlFor="nome">
        Nome
        <input
          type="text"
          id="nome"
          name="name"
          data-testid="profile-name-input"
          value={ formProfile.name }
          onChange={ (event) => handleInputChange(event) }
        />
      </label>
      <label htmlFor="e-mail">
        Email
        <input
          type="email"
          id="e-mail"
          readOnly="readOnly"
          name="email"
          data-testid="profile-email-input"
          value={ formProfile.email }
          onChange={ (event) => handleInputChange(event) }
        />
      </label>
      { sucessState && <p>Atualização concluída com sucesso</p> }
      <button
        type="submit"
        data-testid="profile-save-btn"
        onClick={ (e) => handleSubmit(e) }
        disabled={ alterState }
      >
        Salvar
      </button>
    </>
  );
}

export default FormProfile;
