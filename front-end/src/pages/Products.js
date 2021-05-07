import React from 'react';
import { Header } from 'semantic-ui-react';
import CustomTopMenu from '../components/CustomTopMenu';
import CustomProductCard from '../components/CustomProductCard';

function Products() {
  renderIngredients = () => {
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    const MAX_LENGTH = products.length > LENGTH ? LENGTH : products.length;
    return (
      <div className="explore-ingredients-content">
        { products.slice(INITIAL_LENGTH, MAX_LENGTH).map((beer, index) => (
          <CustomProductCard
            key={ beer.id }
            index={ index }
            drink={ beer }
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
