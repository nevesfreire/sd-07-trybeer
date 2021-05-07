const connection = require('../connection');

const createSale = async (data) => {
    const { date, status = 'checkout' } = data;
    const response = await connection
    .execute(`INSERT INTO 
    Trybeer.sales (user_id, 
        total_price, delivery_address, delivery_number, sale_date, status) VALUES 
    (?,?,?,?,?,?)`, [data.userID, 
        data.total_price, data.delivery_address, data.delivery_number, date, status], 
        (err, result) => {
            if (err) return false; 
            return result.insertId;
        });
    return response;
};

const createSaleProduct = async (products, saleID) => {
    await products.map(async (product) => {
        await connection
        .execute(`INSERT INTO 
        Trybeer.sales_products (sale_id, product_id, quantity) VALUES 
        (?,?,,?)`, [saleID, product.id, product.quantity]);
    });
    return saleID;
};

const getSale = (data) => data;

module.exports = {
    createSale,
    getSale,
    createSaleProduct,
};