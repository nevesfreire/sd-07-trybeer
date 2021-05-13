const ProductService = require('../services/ProductService');
const ProductModel = require('../models/ProductModel');
const { generateToken } = require('../helper/AuthValidation');
const CODE = require('../helper/statusCodes');
jest.mock('../models/ProductModel')

const invalidToken = '123sqe34';
const user = {
  email: 'teste@teste.com',
  password: 'teste123',
}
const token = generateToken(user);

const admin = {
  email: 'teste@teste.com',
  password: 'teste123',
  role: 'administrator',
}
const tokenAdmin = generateToken(admin);

describe('1 - Product Service', () => {
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
      await ProductService.findAll(invalidToken);
    } catch (e) {
      // expect(e.status).toEqual(CODE.UNAUTHORIZED);
      expect(e.message).toEqual('Token inválido!');
    }
  });

  test('Exibe a lista de produtos', async () => {
    const responseModel = [{
      id: 1,
      name: "Skol Lata 250ml",
      price: "2.20",
      url_image: "http://localhost:3001/images/Skol Lata 350ml.jpg"
    }]
    ProductModel.findAll.mockImplementation(() => Promise.resolve(responseModel));
    const response = await ProductService.findAll(token);
    expect(response.statusCode).toEqual(200);
    expect(response.products[0].id).toEqual(responseModel[0].id);
  });

  test('Exibe a lista de produtos para administrador', async () => {
    const responseModel = [{
      id: 1,
      name: "Skol Lata 250ml",
      price: "2.20",
      url_image: "http://localhost:3001/images/Skol Lata 350ml.jpg"
    }]
    ProductModel.findAll.mockImplementation(() => Promise.resolve(responseModel));
    const response = await ProductService.findAll(tokenAdmin);
    expect(response.statusCode).toEqual(200);
    expect(response.products[0].id).toEqual(responseModel[0].id);
  })
});

