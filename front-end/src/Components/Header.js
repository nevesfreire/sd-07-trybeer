import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import SideBar from './Sidebar';

function Header(props) {
  const [isDisable, setIsDisable] = useState(true);

  const verifyData = () => {
    if (isDisable === true) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };
  const { name } = props;
  return (
    <div>
      <button
        type="button"
        data-testid="top-hamburguer"
        onClick={ verifyData }
      >
        hamburguer hmm
      </button>
      <h3 data-testid="top-title">{name || 'TryBeer'}</h3>
      { !isDisable && <SideBar />}
    </div>
  );
}

// Header.propTypes = {
//   name: PropTypes.node.isRequired,
// };

export default Header;
