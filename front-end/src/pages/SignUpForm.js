import React, { useState, useCallback, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import CustomMessage from '../components/CustomMessage';
import CustomHeader from '../components/CustomHeader';
import CustomSignUpForm from '../components/CustomSignUpForm';
import fetchUser from '../service/user';

import CentralContext from '../context/Context';

function SignUp() {
  const history = useHistory();
  const [formData, setFormData] = useState(new Map());
  const { setIsExistEmail } = useContext(CentralContext);

  const searchEmail = (user) => {
    console.log(user);
    if (user === 'Request failed with status code 409') {
      setIsExistEmail(true);
      return true;
    }
  };

  const validate = () => {
    const passLimit = 5;
    const nameLimit = 12;

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    if (email) {
      const regexEmail = /\S+@\S+\.\S+/;
      if (!regexEmail.test(email)) {
        return true;
      }
    }

    if (!password || password.length <= passLimit) {
      return true;
    }
    if (name) {
      const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

      if (!regexName.test(name) || name.length < nameLimit) {
        return true;
      }
    }
    return false;
  };

  // const isExistEmail = async (user) => {
  //   console.log('user', user)
  //   if(user === 'Request failed with status code 409') return false;
  //   return true;
  // }

  const handleSubmit = async () => {
    const name = formData.get('name');
    // const userName = formData.get('userName');
    const email = formData.get('email');
    const password = formData.get('password');
    const iWantToSell = formData.get('iWantToSell');
    validate();
    const resultSell = iWantToSell !== undefined;
    const user = await fetchUser(name, email, password, resultSell);
    if (searchEmail(user)) return;
    if (!resultSell) return history.push('/products');
    history.push('/admin/orders');
  };

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData((prevState) => new Map(prevState).set(name, value));
  }, []);

  return (
    <Grid
      textAlign="center"
      style={ { height: '100vh' } }
      verticalAlign="middle"
    >
      <Grid.Column style={ { maxWidth: 450 } }>
        <CustomHeader message="TryBeer" />
        <CustomSignUpForm
          formData={ formData }
          onInputChange={ handleInputChange }
          onHandleSubmit={ handleSubmit }
          isValid={ validate }
          // existEmail={isExistEmail}
        />
        <CustomMessage>
          Já possui conta ?
          {' '}
          <Link to="/login">logar</Link>
        </CustomMessage>
      </Grid.Column>
    </Grid>
  );
}

export default (SignUp);
