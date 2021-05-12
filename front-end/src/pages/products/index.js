import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Prices, Images, Texts, SalesCar } from '../../components/index';
import Counts from '../../components/Counts';
import TrybeerContext from '../../context/TrybeerContext';
import { productList } from '../../service/trybeerApi';
import TopMenu from '../../components/Header';

import './style.css';

export default function Product() {
  const { priceCar } = useContext(TrybeerContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userStorage = JSON.parse(localStorage.getItem('user'));

  const listProducts = async () => {
    setIsLoading(true);
    const productData = await productList();
    if (productData.error) {
      // window.location.reload();
      return setProducts([]);
    }
    setProducts(productData);
    setIsLoading(false);
  };

  useEffect(() => {
    listProducts();
  }, []);

  if (userStorage === null) {
    return (<Redirect to="/login" />);
  }

  return (
    <div>
      <div>
        <h3>{ isLoading ? 'Carregando' : '' }</h3>
        <TopMenu />
      </div>
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
    </div>
  );
}
