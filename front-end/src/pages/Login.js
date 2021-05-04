import React from 'react';
import PropTypes from 'prop-types';

import React from 'react';

export default function Login() {
  
  const handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.enableButton());
  }

  const handleClick = () => {
    const { email } = this.state;
    const userEmail = { email };
    const { history } = this.props;
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('./comidas');
  }

  const enableButton = () => {
    const { email, password } = this.state;
    const regexForEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const length = 6;
    const passwordIsValid = password.length > length;
    const emailIsValid = regexForEmail.test(email);
    /* if (passwordIsValid && emailIsValid === true) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    } */
  }


  const { disabled } = this.state;

  return (
    <div>
      <form>
        <input
          name="email"
          data-testid="email-input"
          type="email"
          onChange={ this.handleChange }
        />
        <input
          name="password"
          data-testid="password-input"
          type="password"
          onChange={ this.handleChange }
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
