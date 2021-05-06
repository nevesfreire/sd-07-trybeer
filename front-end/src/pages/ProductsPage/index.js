import React, { useEffect, useState } from 'react';
import { ProductCard, ClientMenu } from '../../components';
import api from '../../services/api';

function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.getProducts();
      setProducts(response);
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? <h1>Carregando</h1> : (
    <>
      <ClientMenu><p data-testid="top-title">TryBeer</p></ClientMenu>
      <section>
        {products.map((product) => <ProductCard key={ product.id } data={ product } />)}
      </section>
    </>
  );
}

export default Products;
