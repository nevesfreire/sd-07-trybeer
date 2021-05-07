import React, { useContext, useEffect } from 'react';
import BeerContext from '../../../context/beerContext';
import TopMenu from '../../../commons/simple/TopMenu';
import ProductsCard from '../../../components/productsCard'
import getProductsRequest from '../../../services/productsApi';

function Products() {
  const { products, setProducts, isFetching, setIsFetching } = useContext(BeerContext);

  const renderProducts = async() => {
    const result = await getProductsRequest();
    setProducts(result.data);
  }
  
  useEffect (() => {
    renderProducts()
  }, [])
  console.log(products);
  
  return (
    <>
      <TopMenu title="TryBeer" />
      <h1>Product Screen</h1>
      {products.map((product) => {
        return <ProductsCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.url_image}
          />
      })}
    </>
  );
}

export default Products;
