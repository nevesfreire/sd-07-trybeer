import React, { useContext } from 'react';
import TrybeerContext from '../store/context';

function Checkout() {
  const { cart } = useContext(TrybeerContext);
  return (
    <div>
      {console.log(cart)}
      Me pague!!!
    </div>
  );
}

export default Checkout;
