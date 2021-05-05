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

  const validate = () => {
    const name = formData.get('name');
    const email = formData.get("email");
    const password = formData.get("password");
    if (email) {
      const regexEmail = /\S+@\S+\.\S+/;
      if (!regexEmail.test(email)) {
        return true;
      }
    }
    if (!password || password.length <= 5) {
      return true;
    }
    if (name) {
      const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
      if(!regexName.test(name) || name.length <12 ){
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async () => {
    const name = formData.get('name');
    const userName = formData.get('userName');
    const email = formData.get('email');
    const password = formData.get('password');
    const iWantToSell = formData.get('iWantToSell');
    validate()
    console.log(iWantToSell)
    if (iWantToSell ==! "Quero vender" ) return history.push("/products");
    history.push("/admin/orders"); 
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
            isValid={validate}
          />
          <CustomMessage>
            Já possui conta ? <Link to="/login">logar</Link>
          </CustomMessage>
        </Grid.Column>
      </Grid>
    );
}


export default (SignUp);
