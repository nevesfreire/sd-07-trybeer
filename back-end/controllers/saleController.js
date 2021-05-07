const service = require('../services/saleService');

const createSale = async (req, res) => {
    // const obj = { user_id, total_price, delivery_address, delivery_number, products }
    try {
        const data = await service
        .createSale(req.body);
        if (data) return res.status(201).json({ message: 'Sale registered' });
    } catch (error) {
        res.status(500).json({
            message: 'We found an error',
        });
    }
};

const getSale = async (req, res) => {
    res.send('Ok');
};

module.exports = {
    createSale,
    getSale,
};
