import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import useFetch from '../hooks/useFetch';

function ClientOrdersDetails({ history }) {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [jwtInvalid, setJwtInvalid] = useState(false);
  console.log(history);

  const { getClientOrderDetails } = useFetch();
  const callAPI = async (token) => {
    const resultAPI = await getClientOrderDetails(token);
    if (resultAPI.message) return setJwtInvalid(true);
    setOrderDetails(resultAPI);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setJwtInvalid(false);
    const userResult = JSON.parse(localStorage.getItem('user'));

    callAPI(userResult.token)
  }, []);

  if (jwtInvalid) return (<Redirect to="/login" />);
  return loading ? (
    <span>Tenha Fé...</span>
  ) : (
    <>
    </>
  );
}

export default ClientOrdersDetails;
