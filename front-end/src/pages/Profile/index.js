import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchUser } from '../../requests';
import SideBar from '../components/Header';

function Profile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const getProfile = async () => {
    const { history } = props;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) history.push('/login');
    setName(user.name);
    setEmail(user.email);
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const validateData = () => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    const minNameLength = 12;
    const validName = name.length >= minNameLength && nameRegex.test(name);

    if (validName) {
      return setbuttonDisabled(false);
    }
    setbuttonDisabled(true);
  };

  const handleChangeName = ({ target: { value } }) => {
    setName(value);
    validateData();
  };

  const handleClick = async () => {
    const returnedMessage = await fetchUser(name, email);
    console.log(returnedMessage);
    const user = JSON.parse(localStorage.getItem('user'));
    user.name = name;
    localStorage.setItem('user', JSON.stringify(user));
    setMessage(returnedMessage.message);
  };

  return (
    <div>
      <SideBar title="Meu perfil" />
      <form>
        <label htmlFor="profile-name-input">
          <input
            data-testid="profile-name-input"
            type="text"
            name="name"
            value={ name }
            onChange={ (e) => handleChangeName(e) }
          />
          Nome
        </label>
        <label htmlFor="profile-email-input">
          <input
            data-testid="profile-email-input"
            type="email"
            name="email"
            value={ email }
            readOnly
          />
          Email
        </label>
        <button
          type="button"
          data-testid="profile-save-btn"
          disabled={ buttonDisabled }
          onClick={ handleClick }
        >
          Salvar
        </button>
        <span>{ message }</span>
      </form>
    </div>
  );
}

export default Profile;

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
