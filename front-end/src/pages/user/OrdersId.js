import React, { useContext, useEffect } from 'react';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function OrdersId() {
  const { sideIsActive, setPageTitle } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Detalhes de Pedido');
  }, []);

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
    </div>
  );
}

export default OrdersId;
