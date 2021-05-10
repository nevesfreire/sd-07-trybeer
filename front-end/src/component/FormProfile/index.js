import React, { useEffect, useState } from 'react';
import { getToLocalStorage } from '../../utils/localStorage'

const FormDefault = {
  name:'',
  email:'',
}
function FormProfile() {
  
  const [ formProfile, setFormProfile ] = useState(FormDefault);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormProfile({...formProfile, [name]: value})
  };
  
  useEffect(() => {
    const name = getToLocalStorage().name
    const email = getToLocalStorage().email
    setFormProfile({ name, email })
  },[])
  
  
  return (
    <>
      <label>
        Nome
        <input type="text" 
        name="name"
        data-testid="profile-name-input"
        value={formProfile.name}
        onChange={(event) => handleInputChange(event)}
        />
      </label>
      <label>
        Email
        <input type="email" 
        readOnly="readOnly"
        name="email"
        data-testid="profile-email-input"
        value={formProfile.email}
        onChange={(event) => handleInputChange(event)}
        />
      </label>
      <button
      type="submit"
      data-testid="profile-save-btn"
      >
        Salvar
      </button>
    </>  
  )
}

export default FormProfile;