const fs = require('fs');
const path = require('path');
const {
  productsServices,
  checkoutServices,
  ordersServices,
  saleProductsServices,
  admOrdersServices,
  admOrdersDetailsServices,
  updateOrderStatusServices,
} = require('../services/productsServices');

const {
  OK_200,
  UNAUTHORIZED_401 } = require('../util');

  const internalError = 'Internal Error';

  const products = async (req, res) => {
    try {
      const allProducts = await productsServices();
      res.status(OK_200).json(allProducts);
    } catch (err) {
      console.error(err.message);
      res.status(UNAUTHORIZED_401).send({ message: internalError });    
    }
  };

  const images = async (req, res) => {
    try {
      const { imageName } = req.params;
      const image = fs.createReadStream(path.join(__dirname, `../images/${imageName}`));
      res.status(OK_200).sendFile(image.path); 
    } catch (err) {
      console.error(err.message);
      res.status(UNAUTHORIZED_401).send({ message: internalError });    
    }
  };

  const checkout = async (req, res) => {
    try {
      const pedido = req.body;
      const retorno = await checkoutServices(pedido);
      res.status(OK_200).json(retorno);
    } catch (err) {
      console.error(err.message);
      res.status(UNAUTHORIZED_401).send({ message: internalError });    
    }
  };

  const orders = async (req, res) => {
    try {
      const { email } = req.body;
      const pedidos = await ordersServices(email);      
      res.status(OK_200).json(pedidos);
    } catch (err) {
      console.error(err.message);
      res.status(UNAUTHORIZED_401).send({ message: internalError });    
    }
  };

  const saleProducts = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await saleProductsServices(id);
      res.status(OK_200).json(result);
    } catch (err) {
      console.error(err.message);
      res.status(UNAUTHORIZED_401).send({ message: internalError });
    }
  };

  const adminOrders = async (req, res) => {
    try {
      const pedidos = await admOrdersServices();
      res.status(OK_200).json(pedidos);
    } catch (err) {
      console.error(err.message);
      res.status(UNAUTHORIZED_401).send({ message: internalError });
    }
  };

  const adminOrdersDetails = async (req, res) => {
    try {
      const orderId = req.params.id;
      const orderDetails = await admOrdersDetailsServices(orderId);
      res.status(OK_200).json(orderDetails);
    } catch (err) {
      console.error(err.message);
      res.status(UNAUTHORIZED_401).send({ message: internalError });
    }
  };

  const delivered = async (req, res) => {
    try {
      const { id } = req.body;
      const orderUpdated = await updateOrderStatusServices(id);
      res.status(OK_200).json(orderUpdated);
    } catch (err) {
      console.error(err.message);
      res.status(UNAUTHORIZED_401).send({ message: internalError });
    }
  };

  module.exports = {
    products,
    images,
    checkout,
    orders,
    saleProducts,
    adminOrders,
    adminOrdersDetails,
    delivered,
  };