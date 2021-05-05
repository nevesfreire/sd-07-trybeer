import React, { useState, useEffect } from "react";

const defaultForm = {
  name: '',
  email:'',
  password: '',
  checkbox: false,
  role:'',
};

function FormRegister() {
  const [formRegister, setFormRegister] = useState(defaultForm);
  
  const handleImputChange = (event) => {
    const { value, name } = event.target;
    if (name === 'checkbox') {
      let check = JSON.stringify(!value)
      setFormRegister({ ...formRegister, [name]: check });
    }
    setFormRegister({ ...formRegister, [name]: value });
  };

  return (
    <form>
      <label htmlFor="name">
        Nome
        <input 
        type="text" 
        id="name" 
        name="name"
        data-testid="signup-name"
        onChange={ (e) => handleImputChange(e) }
      />
      </label>
      <label htmlFor="email">
        Email
        <input 
        type="email" 
        id="email" 
        name="email"
        data-testid="signup-email"   
        onChange={ (e) => handleImputChange(e) }
        />
      </label>
      <label htmlFor="password">
        Password
        <input 
        type="password" 
        id="password" 
        name="password"
        data-testid="signup-password"
        onChange={ (e) => handleImputChange(e) }

        />
      </label>
      <div>
        <input 
        type="checkbox" 
        id="checkbox" 
        name="checkbox"
        data-testid="signup-seller"
        onChange={ (e) => handleImputChange(e) }
        />
        <label htmlFor="checkbox">Quero vender</label>
      </div>
      <button
      type= "submit"
      data-testid="signup-btn"
      >
        Cadastrar
      </button>
    </form>
  )
}

export default FormRegister;