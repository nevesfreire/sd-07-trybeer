const connection = require('../connection');

const createSale = async (data) => {
    const { date, status = 'Pendente' } = data;
    const response = await connection
    .execute(`INSERT INTO
    Trybeer.sales (user_id,
        total_price, delivery_address, delivery_number, sale_date, status) VALUES
    (?,?,?,?,?,?)`, [data.userID,
        data.total_price, data.delivery_address, data.delivery_number, date, status]);
    return response[0].insertId;
};

const createSaleProduct = async (products, saleID) => {
    await products.map(async (product) => {
        await connection
        .execute(`INSERT INTO 
        Trybeer.sales_products (sale_id, product_id, quantity) VALUES 
        (?,?,?)`, [saleID, product.id, product.quantity]);
    });
    return saleID;
};

const getSale = async (id) => {
    const [rows] = await connection
    .execute(`SELECT id, sale_date, total_price 
    FROM Trybeer.sales WHERE user_id = ?`, [id]);
    return rows;
};

module.exports = {
    createSale,
    getSale,
    createSaleProduct,
};