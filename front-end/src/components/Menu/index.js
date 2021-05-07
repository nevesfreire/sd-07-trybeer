import React /* { useContext } */ from 'react';
import Burger from './burger';
import MenuClient from './menuClient';
import MenuAdmin from './menuAdmin';

function MenuBurger() {
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();

  const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <div ref={ node } class="side-menu-container">
        <Burger open={ open } setOpen={ setOpen } />
        {currentUser.role === 'client' ? (
          <MenuClient open={ open } setOpen={ setOpen } />
        ) : (
          <MenuAdmin open={ open } setOpen={ setOpen } />
        )}
      </div>
    </div>
  );
}

export default MenuBurger;
