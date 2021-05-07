import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import LoginComponent from '../components/LoginComponent';
import HeaderComponent from '../components/HeaderComponent';
import { fetchToken } from '../helpers/apiHelper';

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState(new Map());

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData((prevState) => new Map(prevState).set(name, value));
  }, []);

  const validateInputs = () => {
    const email = formData.get('email');
    const password = formData.get('password');
    const minimumPasswordLength = 5;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      email
      && emailValidator.test(email)
      && password
      && password.length > minimumPasswordLength) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const email = formData.get('email');
    const password = formData.get('password');
    const loginResponse = await fetchToken(email, password);
    if (loginResponse) return history.push('/');
    history.push('/login');
  };

  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <HeaderComponent message="Trybeer" />

        <LoginComponent
          formData={ formData }
          onInputChange={ handleInputChange }
          onHandleSubmit={ handleSubmit }
          validateInputs={ validateInputs }
        />
      </Grid.Column>
    </Grid>
  );
}

export default Login;
