import React, { useContext, useEffect } from 'react';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function Checkout() {
  const { sideIsActive, setPageTitle } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Finalizar Pedido');
  }, []);

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
    </div>
  );
}

export default Checkout;
