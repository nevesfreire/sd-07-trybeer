import React, { useEffect } from 'react';

function Products() {
  useEffect(() => {
    fetch('http://localhost:3001/Products');
  }, []);
  return (
    <div />
  );
}

export default Products;
