import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ComponentProducts from '../components/Products';

function Cliente(props) {
  const { history } = props;
  return (
    <div className="container-register">
      <Header title="TryBeer" />
      <Menu path={ history } />
      <div>
        <ComponentProducts />
      </div>
    </div>
  );
}

Cliente.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Cliente;
