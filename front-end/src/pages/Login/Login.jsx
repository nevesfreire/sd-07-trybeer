import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as API from '../../services/api';
import { setStorage } from '../../services/localStorage';
import styles from './styles.module.scss';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const MIN_LENGTH = 6;
    if (password.length >= MIN_LENGTH && regex.test(email)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleButton = async () => {
    const userData = await API.login({ email, password });
    if (userData.message) return setUserNotFound(true);

    setStorage('user', userData);
    if (userData.role === 'client') return history.push('/products');
    history.push('/admin/orders');
  };

  return (
    <div className={ styles.main }>
      <div className={ styles.logo }>Logo</div>
      <form>
        { userNotFound && <div className={ styles.error }>Usúario não cadastrado</div>}
        <label htmlFor="email">
          <h6>Email</h6>
          <input
            placeholder="E-mail"
            type="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          <h6>Senha</h6>
          <input
            placeholder="Senha"
            type="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <br />
        <button
          className={ styles.signin }
          type="button"
          data-testid="signin-btn"
          disabled={ disabled }
          onClick={ handleButton }
        >
          Entrar
        </button>
        <button
          className={ styles.newAcc }
          type="button"
          data-testid="no-account-btn"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}

export default Login;
