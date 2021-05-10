const connection = require('./connection');

const create = async (saleId, userId, quantity) => {
  try {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [saleId, userId, quantity],
    );
  } catch (error) {
    throw new Error('Erro de conexão');
  }
};

module.exports = { create };
