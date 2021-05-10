import React, {useState} from 'react';
import Header from '../../Components/Header';
import ListCardsProduts from '../../Components/ListCardsProduts'

function Products() {
  return(
    <div>
      <Header />
      <p>produtos</p>
    </div>
  )
  /*const [allProducts, setAllProducts] = useState();

  fetch('http://localhost:3001/products', {
      method: 'GET',
    }).then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      });
  
  return (
    <div>
      <Header />
      <div className="cards">
      {allProducts.map((product) => (
          <ListCardsProduts name={product.name} price={product.price} img={product.url_image} />
        ))}
      </div>
    </div>
  );*/
}

export default Products;
