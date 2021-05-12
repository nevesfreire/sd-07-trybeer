import React from 'react';
import PropTypes from 'prop-types';

function ListCardsProduts(props) {
  const { price, img, name } = props;
  return (
    <div>
      <p>
        {' '}
        R$
        { price }
      </p>
      <image src={ img } />
      <h5>{ name }</h5>
    </div>
  );
}

ListCardsProduts.propTypes = {
  name: PropTypes.node.isRequired,
  price: PropTypes.node.isRequired,
  img: PropTypes.node.isRequired,
};

export default ListCardsProduts;
