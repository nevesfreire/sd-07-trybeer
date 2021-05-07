import React, { useState, useEffect, useContext } from 'react';
import { Segment, Sidebar } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ClientProfileComponent from './ClientProfileComponent';
import { fetchUpdateClient } from '../helpers/apiHelper';
import { getUser, setUser } from '../helpers/localStorageHelper';
import BeerContext from '../context/BeerContext';

function Profile() {
  const [formData, setFormData] = useState({});
  const { setErrorMessage } = useContext(BeerContext);

  const setValue = () => {
    const { name, email } = getUser();
    setFormData({ name, email });
  };

  const handleSubmit = async () => {
    const { id, token, role, email } = getUser();
    const updateResponse = await fetchUpdateClient(formData.name, id, token);
    console.log(updateResponse);
    const newUser = {
      name: updateResponse.newName,
      email,
      token,
      role,
      id,
    };
    setUser(newUser);
    setErrorMessage(updateResponse.message);
  };

  const validateInputs = () => {
    const { name } = getUser();
    const newName = formData.name;
    if (name === newName) return true;
    return false;
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setValue();
  }, []);

  if (getUser() === null) {
    console.log('valor', getUser());
    return <Redirect to="/login" />;
  }

  return (
    <Sidebar.Pusher>
      <Segment basic>
        <ClientProfileComponent
          formData={ formData }
          onInputChange={ handleInputChange }
          onHandleSubmit={ handleSubmit }
          validateInputs={ validateInputs }
        />
      </Segment>
    </Sidebar.Pusher>
  );
}

export default Profile;
