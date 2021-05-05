import React, { useContext, useEffect } from 'react';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function MeusPedidos() {
  const { sideIsActive, setPageTitle } = useContext(MyContext);
  useEffect(() => {
    setPageTitle('Meus Pedidos');
  }, []);
  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
    </div>
  );
}

export default MeusPedidos;
