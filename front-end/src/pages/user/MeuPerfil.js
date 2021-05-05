import React, { useContext, useEffect } from 'react';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function MeuPerfil() {
  const { sideIsActive, setPageTitle } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('Meu perfil');
  }, []);

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
    </div>
  );
}

export default MeuPerfil;
