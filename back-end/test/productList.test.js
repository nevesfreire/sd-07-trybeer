const ProductService = require('../services/ProductService');
const ProductModel = require('../models/ProductModel');
const { productList } = require('./configs/reponseModel');
const token = require('./configs/token');
const CODE = require('../helper/statusCodes');
jest.mock('../models/ProductModel')

describe('1 - Product Service - Lista de Produtos', () => {
  test('É necessário realizar autenticação para acessar a lsita de produtos', async () => {
    try {
      await ProductService.findAll();
    } catch (e) {
      expect(e.status).toEqual(CODE.UNAUTHORIZED)
      expect(e.message).toEqual('Necessário realizar autenticação')
    }
  });

  test('É necessário que o token seja válido', async () => {
    try {
      await ProductService.findAll(token.invalid);
    } catch (e) {
      // expect(e.status).toEqual(CODE.UNAUTHORIZED);
      expect(e.message).toEqual('Token inválido!');
    }
  });

  test('Exibe a lista de produtos para usuário autenticado', async () => {

    ProductModel.findAll.mockImplementation(() => Promise.resolve(productList));
    const response = await ProductService.findAll(token.user);
    expect(response.statusCode).toEqual(200);
    expect(response.products.id).toEqual(productList.id);
  });
});

