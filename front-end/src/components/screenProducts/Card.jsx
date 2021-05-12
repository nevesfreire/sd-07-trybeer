import React from 'react';
import { useEffect, useState } from 'react';
import { fetchApi } from '../../services';
import { handleStorage } from '../../utils';

export default function Card({ product }) {
  const [image, setImage] = useState(product.url_image);
  const { token } = handleStorage.get('user');

  const body = {
    method: 'GET',
    headers: {
      'Content-Type': 'image/jpg',
      Authorization: token,
    },
  };

  useEffect(() => {
    fetchApi('/image', body).then(response => response.json()).then(img => setImage(img)); 
  });
  return (
    <>
      <h4 data-testid={`${product.id}-product-name`} >{ product.name }</h4>
      <h5 data-testid={`${product.id}-product-price`}>{ product.price }</h5>
      <img src={ image } alt="foto da bebida" data-testid={`${product.id}-product-img`} />
    </>
  )
}