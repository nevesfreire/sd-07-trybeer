import React, { useState, useCallback } from 'react';
import { Container, Header } from 'semantic-ui-react';

import { getToken } from '../helpers/localStorage';
import CustomHeader from '../components/CustomHeader';
import CustomProfile from '../components/CustomProfile';
import fetchUpdate from '../service/profile';
import CustomTopMenu from '../components/CustomTopMenu';

function Profile() {
  const { email, name } = getToken();
  const [btnEnable, setBtnEnable] = useState(true);
  const [txtEnable, setTxtEnable] = useState(true);
  // const history = useHistory();
  const changeStateBtn = () => {
    setBtnEnable(false);
  };

  const [formDataUpdate, setFormDataUpdate] = useState(new Map());

  const handleInputChange = useCallback(({ target: { key, value } }) => {
    setFormDataUpdate((prevState) => new Map(prevState).set(key, value));
  }, []);

  const updateName = async () => {
    const twoHundred = 200;
    // const name = formDataUpdate.get('name');
    const { id, token } = getToken();
    const result = await fetchUpdate(email, name, id, token);
    if (result === twoHundred) setTxtEnable(false);
    // if (result === undefined) history.push('/login');
  };

  return (
    <div style={ { width: '100%', height: '103vh', backgroundColor: 'rgb(33, 33, 33)' } }>
      <Header style={ { display: 'flex', alignItems: 'center' } }>
        <CustomTopMenu />
        <CustomHeader message="Meu perfil" />
      </Header>
      <Container>
        <CustomProfile
          name={ name }
          email={ email }
          btnEnable={ btnEnable }
          txtEnable={ txtEnable }
          formDataUpdate={ formDataUpdate }
          stateBtn={ changeStateBtn }
          uptName={ updateName }
          onInputChange={ handleInputChange }
        />
      </Container>
    </div>
  );
}

export default Profile;
