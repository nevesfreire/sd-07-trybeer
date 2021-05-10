import React, { useState }from 'react';
import SideBar from './Sidebar';

function Header (props) {
  const [isDisable, setIsDisable] = useState(true);

  const verifyData = () => {
    if(isDisable === true) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }

  return(
    <div>
      <button
        data-testid="top-hamburguer"
        onClick={ verifyData }
      >hamburguer hmm</button>
      <h3 data-testid="top-title">{props.name ? props.name : 'TryBeer'}</h3>
      { !isDisable && <SideBar />}
    </div>
  )
};

export default Header;
