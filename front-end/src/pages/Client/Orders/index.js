import React, { useEffect, useState } from 'react';

import jwtDecode from 'jwt-decode';

import TopMenu from '../../../commons/simple/TopMenu';

import SideBar from '../../../commons/composed/SideBar';

function Orders() {
  const [role, setRole] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
   
    const getToken = async () => {
      const tokenUser = await localStorage.getItem('token');
      const userData = jwtDecode(tokenUser);
      setRole(userData.role)
      setIsLoading(false)
    }
    
    getToken()
  }, [])

  return (
    <div>
      { isLoading && <h1>Loading...</h1> }
      { !isLoading && role !== 'administrator' && <TopMenu title="Meus Pedidos" /> }
      { !isLoading && role === 'administrator' && <SideBar isAdmin={ true } />  }
    </div>
  );
}

export default Orders;
