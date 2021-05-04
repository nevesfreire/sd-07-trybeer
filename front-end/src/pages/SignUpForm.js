import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import  CustomMessage from '../components/CustomMessage';
import  CustomHeader from '../components/CustomHeader';
import  CustomSignUpForm from '../components/CustomSignUpForm';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


function SignUp() {
  const history = useHistory();
  const [formData, setFormData] = useState(new Map());

  const handleSubmit = async () => {
    const name = formData.get('name');
    console.log(name)
    const userName = formData.get('userName');
    const email = formData.get('email');
    const password = formData.get('password');
    history.push('/login'); 
  };

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData(prevState => {
      return new Map(prevState).set(name, value);
    });
  }, []);

    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <CustomHeader message="Central de Erros" />
          <CustomSignUpForm
            formData={formData}
            onInputChange={handleInputChange}
            onHandleSubmit={handleSubmit}
          />
          <CustomMessage>
            Já possui conta ? <Link to="/login">logar</Link>
          </CustomMessage>
        </Grid.Column>
      </Grid>
    );
}


export default (SignUp);
