import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import CustomLogin from '../components/CustomLogin';
import CustomHeader from '../components/CustomHeader';
import fetchToken from '../service/auth';

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState(new Map());

  const register = () => history.push('/registar');

  const validate = () => {
    const email = formData.get('email');
    const password = formData.get('password');
  };

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData(prevState => {
      return new Map(prevState).set(name, value);
    });
  }, []);

  const handleSubmit = async () => {
    const email = formData.get('email');
    const password = formData.get('password');
    const loginResponse = await fetchToken(password, email);

    history.push('/login');
  }; 

  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh' }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 500 }}>
        <CustomHeader message="TRYBEER" />
        <CustomLogin
          formData={formData}
          onInputChange={handleInputChange}
          onHandleSubmit={handleSubmit}
          goRegister={register}
          isValid={validate}
        />
      </Grid.Column>
    </Grid>
  );
}

export default Login;
