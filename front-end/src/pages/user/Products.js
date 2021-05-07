import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';
import ProductsCards from '../../components/ProductsCards';

function Products() {
  const {
    sideIsActive,
    setPageTitle,
    setProducts,
    setTotal,
  } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    setPageTitle('TryBeer');
  }, [setPageTitle]);

  useEffect(() => {
    const getUser = () => !JSON.parse(localStorage.getItem('user'))
      && history.push('/login');
    getUser();
  }, [history]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setTotal(JSON.parse(localStorage.getItem('totalCart')));
  }, []);

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      {isLoading ? <span>Carregando...</span> : <ProductsCards />}
    </div>
  );
}

export default Products;
