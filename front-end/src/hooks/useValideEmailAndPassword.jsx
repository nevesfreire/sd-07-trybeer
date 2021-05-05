import { useState } from 'react';
import { userDataValidation } from '../utils';

function validate({ email = '', password = '' }) {
  return (userDataValidation.email(email) && userDataValidation.password(password));
}
// Deprecated
export default function useValideEmailAndPassword() {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleState = ({ target: { value, id } }) => {
    setUser((state) => ({ ...state, [id]: value }));
  };

  return [validate(user), handleState];
}
