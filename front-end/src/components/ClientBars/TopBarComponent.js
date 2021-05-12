import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import BeerContext from '../../context/BeerContext';

const TopBarComponent = ({ children }) => {
  const { toggleSideBar, setToggleSideBar } = useContext(BeerContext);
  const handleItemClick = () => setToggleSideBar(!toggleSideBar);

  return (
    <Menu>
      <Menu.Item
        name="topHamburguer"
        data-testid="top-hamburguer"
        onClick={ handleItemClick }
      >
        <Icon name="bars" />
      </Menu.Item>
      <Menu.Item header data-testid="top-title">{ children }</Menu.Item>
    </Menu>
  );
};

TopBarComponent.propTypes = {
  children: PropTypes.string.isRequired,
};

export default TopBarComponent;
