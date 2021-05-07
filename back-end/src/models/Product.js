const connection = require('./connection');
require('dotenv').config();

const modelProduct = async () => {
  const [data] = await connection.execute(
    'SELECT * FROM Trybeer.products',
  );
  // console.log(data[0].name);
  const productData = data.map((beer) => ({
      imagem: beer.url_image,
      nome: beer.name,
      preco: beer.price,
    }));
  // console.log(`product model ${productData}`);
  return productData;
};

module.exports = {
  modelProduct,
};
