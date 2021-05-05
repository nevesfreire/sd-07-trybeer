import React, { useState, useCallback } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import MessageComponent from '../components/MessageComponent';
import HeaderComponent from '../components/HeaderComponent';
import RegisterComponent from '../components/RegisterComponent';
import { fetchRegister } from '../helpers/apiHelper';

function Register() {
  const [formData, setFormData] = useState(new Map());
  const history = useHistory();
  const SUCCESS = 200;

  const handleSubmit = async () => {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const registerResponse = await fetchRegister(name, email, password);
    if (registerResponse === SUCCESS) return history.push('/');
    history.push('/register');
  };

  const validateInputs = () => {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const minimumPasswordLength = 5;
    const minimumNameLength = 11;
    const nameValidator = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameIsValid = name ? nameValidator.test(name)
      && String(name).length > minimumNameLength : false;
    const emailIsValid = email ? emailValidator.test(email) : false;
    const passwordIsValid = password ? password.length > minimumPasswordLength : false;
    if (
      email !== undefined
      && emailIsValid
      && password !== undefined
      && passwordIsValid
      && name !== undefined
      && nameIsValid) return false;
    return true;
  };

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData((prevState) => new Map(prevState).set(name, value));
  }, []);

  return (
    <Grid textAlign="center" style={ { height: '100v' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 450 } }>
        <HeaderComponent message="Trybeer" />
        <RegisterComponent
          formData={ formData }
          onInputChange={ handleInputChange }
          onHandleSubmit={ handleSubmit }
          validateInputs={ validateInputs }
        />
        <MessageComponent>
          Alaready have account?
          <Link to="/login"> Sing In</Link>
        </MessageComponent>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
