import React from 'react';
import { Header } from 'semantic-ui-react';
import CustomTopMenu from '../components/CustomTopMenu';
import CustomProductCard from '../components/CustomProductCard';
import fetchProducts from '../service/products';
// dasda
function Products() {
    const renderIngredients = () => {
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const products = fetchProducts()
    return (
      <div>
        { products = <p>Loading</p> : products.map((beer, index) => (
          <CustomProductCard
            key={ beer.id }
            index={ index }
            beer={ beer }
          />
        ))}
      </div>
    );
  }
  return (
    <div>
    <Header as="h1" color="orange" textAlign="center">
      <CustomTopMenu />
      <div data-testid="top-title">
        TryBeer
      </div>
    </Header>
    {<CustomProductCard /> && renderIngredients()}
    </div>
  );
}

export default Products;
