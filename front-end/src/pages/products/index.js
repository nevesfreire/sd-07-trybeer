import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Prices, Images, Texts, SalesCar } from '../../components/index';
import Counts from '../../components/Counts';
import TrybeerContext from '../../context/TrybeerContext';
import { productList } from '../../service/trybeerApi';

import './style.css';

export default function Product() {
  const { priceCar } = useContext(TrybeerContext);
  const [products, setProducts] = useState([]);
  const userStorage = JSON.parse(localStorage.getItem('user'));

  const listProducts = async () => {
    const productData = await productList();
    if (productData.error) {
      window.location.reload();
      return setProducts([]);
    }
    setProducts(productData);
  };

  useEffect(() => {
    listProducts();
  }, []);

  if (userStorage === null) {
    return (<Redirect to="/login" />);
  }

  return (
    <div className="div-card">
      {products && products.map((prod, index) => (
        <div key={ prod.id }>
          <br />
          ---------------------------------------------------------------------------
          <Prices index={ index } value={ prod.price } />
          <Images index={ index } value={ prod.url_image } />
          <Texts index={ index } value={ prod.name } />
          <Counts index={ index } price={ prod.price } />
        </div>
      ))}
      <br />
      <div className="div-salesCar">
        <SalesCar value={ priceCar } />
      </div>
    </div>
  );
}
