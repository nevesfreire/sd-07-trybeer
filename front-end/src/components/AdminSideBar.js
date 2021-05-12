import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Menu, Sidebar } from 'semantic-ui-react';
import BeerContext from '../context/BeerContext';

const AdminSideBar = ({ Component }) => {
  const history = useHistory();
  const { toggleSideBar } = useContext(BeerContext);
  console.log(toggleSideBar);
  return (
    <Grid columns={ 1 }>
      <Grid.Column>
        <Sidebar
          as={ Menu }
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible="true"
          width="thin"
          className="side-menu-container"
        >
          <Menu.Item
            as="a"
            data-testid="side-menu-item-orders"
            onClick={ () => history.push('/admin/orders') }
          >
            Pedidos
          </Menu.Item>
          <Menu.Item
            as="a"
            data-testid="side-menu-item-profile"
            onClick={ () => history.push('/admin/profile') }
          >
            Perfil
          </Menu.Item>
          <Menu.Item
            as="a"
            data-testid="side-menu-item-logout"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
          >
            Sair
          </Menu.Item>
        </Sidebar>
        <Component />
      </Grid.Column>
    </Grid>
  );
};

AdminSideBar.propTypes = {
  Component: PropTypes.func.isRequired,
};

export default AdminSideBar;
