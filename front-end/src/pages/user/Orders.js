import React, { useContext, useEffect } from 'react';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function Orders() {
  const { sideIsActive, setPageTitle } = useContext(MyContext);
  useEffect(() => {
    setPageTitle('Meus Pedidos');
  }, [setPageTitle]);

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
    </div>
  );
}

export default Orders;
