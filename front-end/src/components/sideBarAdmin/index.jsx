import React from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './style';

const SideBarAdmin = () => {
  const history = useHistory();

  const handleRoute = (path) => {
    history.push(path);
  };
  return (
    <S.Container>
      <S.Title data-testid="top-title">TryBeer</S.Title>
      <S.WrapperButtons>
        <S.Button
          data-testid="side-menu-item-orders"
          onClick={ () => handleRoute('/admin/orders') }
        >
          Pedidos

        </S.Button>
        <S.Button
          data-testid="side-menu-item-profile"
          onClick={ () => handleRoute('/admin/profile') }
        >
          Perfil

        </S.Button>
      </S.WrapperButtons>
      <S.ButtonLeave>
        <S.Button
          color="#b5179e"
          data-testid="side-menu-item-logout"
          onClick={ () => handleRoute('/') }
        >
          Sair

        </S.Button>
      </S.ButtonLeave>
    </S.Container>
  );
};

export default SideBarAdmin;
