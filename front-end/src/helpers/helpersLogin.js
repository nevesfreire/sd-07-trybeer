import { Redirect } from 'react-router-dom';

const redirectLogin = (data) => {
  if (data.user.role === 'admin') {
    return <Redirect to="/home" />;
  }
  return <Redirect to="/product" />;
};

export default redirectLogin;
