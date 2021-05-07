import React /* { useContext } */ from 'react';
import Burger from './burger';
import MenuClient from './menuClient';

function MenuBurger() {
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();

  return (
    <div>
      <div ref={ node }>
        <Burger open={ open } setOpen={ setOpen } />
        <MenuClient open={ open } setOpen={ setOpen } />
      </div>
    </div>
  );
}

// const useOnClickOutside = (ref, handler) => {
//   React.useEffect(() => {
//     const listener = (event) => {
//       if (!ref.current || ref.current.contains(event.target)) {
//         return;
//       }
//       handler(event);
//     };
//     document.addEventListener('mousedown', listener);

//     return () => {
//       document.removeEventListener('mousedown', listener);
//     };
//   },
//   [ref, handler]);
// };

export default MenuBurger;
