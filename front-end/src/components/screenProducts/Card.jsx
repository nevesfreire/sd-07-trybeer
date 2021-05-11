import React from '.react';

export default function Card({ product }) {
  return (
    <>
      <h4 data-testid={`${product.id}-product-name`} >{ product.name }</h4>
      <h5 data-testid={`${product.id}-product-price`}>{ product.price }</h5>
      <img src={ url_image } alt="foto da bebida" data-testid={`${product.id}-product-img`} />
    </>
  )
}