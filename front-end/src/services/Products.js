const getProducts = () => {
  try {
    const url = 'http://localhost:3001/products';
    return fetch(url)
      .then((response) => response.json())
      .then((json) => json);
  } catch (error) {
    console.log(error.message);
  }
};

export default getProducts;
