import { useHistory } from 'react-router-dom';
import { getUser } from '../helpers/localStorageHelper';

function Home() {
  const history = useHistory();
  if (getUser() !== null) {
    const user = getUser();
    if (user.role === 'client') return history.push('/products');
    return history.push('/admin/orders');
  }
  history.push('/login');
  return null;
}

export default Home;
