import React, { useContext } from 'react';
import { GlobalContext } from '../../services';
import CardButtons from './CardButtons';

export default function ScreenProducts() {
  const { productState: { products } } = useContext(GlobalContext);

  return (
    products.map((product) => (
      <div className="cardContainer" key={ product.id }>
        <h4>{ product.name }</h4>
        <h5>{ product.price }</h5>
        <img src={ product.url_image } alt="foto da bebida" />
        <CardButtons id={ product.id } />
      </div>
    ))
  );
}
