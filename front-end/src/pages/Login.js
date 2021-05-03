import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import CustomLogin from '../components/CustomLogin';

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState(new Map());

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData(prevState => {
      return new Map(prevState).set(name, value);
    });
  }, []);

  const handleSubmit = async () => {
    const userName = formData.get('userName');
    const password = formData.get('password');
    const loginResponse = await fetchToken(userName, password);
    if (loginResponse) return history.push('/central')
    history.push('/');
  }; 

    return (
        <div></div>
    );
  }

export default Login;
