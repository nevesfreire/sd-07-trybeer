import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context';

function useRedirect() {
  const randonNumber = 0;
  const [getEvent, setGetEvent] = useState(randonNumber);
  const { user } = useContext(context);
  const history = useHistory();

  console.log(getEvent); // essa linha só pro slint não me encher o saco

  useEffect(() => {
    if (user === 'admin') {
      history.push('/admin/orders');
    }

    if (user === 'cliente') {
      history.push('/products');
    }
  }, [history, user]);

  return [setGetEvent];
}

export default useRedirect;
