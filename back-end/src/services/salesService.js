const salesModel = require('../models/Checkout');

const saveSales = async (saleObj) => {
    console.log('no service: ', saleObj);
    const sales = await salesModel.savePurchases(saleObj);
    console.log(sales);
    return sales;
};

module.exports = {
    saveSales,
};

// Implementar o salvamento da segunda tabela criando uma model para a mesma e inserindo o id
// Revisar questão do 
