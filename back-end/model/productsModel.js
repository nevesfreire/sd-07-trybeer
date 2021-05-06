const connection = require('../config/connection');

const getAllProducts = async () => {
   const [images] = await connection.execute('SELECT * FROM products');
   return images;
};

module.exports = {
 getAllProducts,
};
