import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { history.push('/login'); } else {
      const { role } = user;
      if (role === 'client') history.push('/products');
      if (role === 'administrator') history.push('/admin/orders');
    }
  });
  return null;
}

export default Home;
