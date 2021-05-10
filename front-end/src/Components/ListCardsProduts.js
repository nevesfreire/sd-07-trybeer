import React from 'react';

function ListCardsProduts (props) {
  return(
    <div>
      <p> R${props.price}</p>
      <image src={props.img} />
      <h5>{props.name}</h5>
    </div>
  )
};

export default ListCardsProduts;