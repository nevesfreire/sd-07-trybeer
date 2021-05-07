import React, { useState, useCallback } from 'react';
// import { useHistory } from 'react-router-dom';
import { getToken } from '../helpers/localStorage';
import CustomHeader from '../components/CustomHeader';
import CustomProfile from '../components/CustomProfile';
import fetchUpdate from '../service/profile';

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
    <div>
      <CustomHeader message="Meu Perfil" data-testid="top-title" />
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
    </div>
  );
}

export default Profile;
