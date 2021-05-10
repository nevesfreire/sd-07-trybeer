const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM Trybeer.products';
  const [products] = await connection.execute(query);
  return products;
};

const getImageProduct = async (name) => {
  const destinationImg = `http://localhost:3001/images/${name}`;
  const imagePath = `/images/${name}`;
  const query = 'SELECT url_image FROM Trybeer.products WHERE url_image = ? ';
  const [productImage] = await connection.execute(query, [destinationImg]);
  if (!productImage[0]) {
    return null;
  }
  return imagePath;
};

module.exports = {
  getAllProducts,
  getImageProduct,
};