import { useState } from 'react';

function validation({ email = '', password = '' }) {
  const emailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  const passwordMinLength = 6;
  const validPassword = password.length >= passwordMinLength;
  const validEmail = emailValidate.test(email);
  return (validPassword && validEmail);
}

export default function useValideEmailAndPassword() {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleState = ({ target: { value, id } }) => {
    setUser({ ...user, [id]: value });
  };

  return [validation(user), handleState];
}
