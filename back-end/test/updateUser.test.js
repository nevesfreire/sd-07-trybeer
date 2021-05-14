const UserService = require('../services/UserService');
const UserModel = require('../models/UserModel');
const token = require('./configs/token');
const CODE = require('../helper/statusCodes');
jest.mock('../models/UserModel');

describe('3 - User Service - Atualizar Usuário', () => {
  test('É necessário realizar autenticação para acessar a lsita de produtos', async () => {
    try {
      await UserService.updateUser();
    } catch (e) {
      expect(e.status).toEqual(CODE.UNAUTHORIZED)
      expect(e.message).toEqual('Necessário realizar autenticação')
    }
  });

  test('É necessário que o token seja válido', async () => {
    try {
      await UserService.updateUser(token.invalid);
    } catch (e) {
      // expect(e.status).toEqual(CODE.UNAUTHORIZED);
      expect(e.message).toEqual('Token inválido!');
    }
  });

  test('É necessário que o name seja válido', async () => {
    const name = '';
    try {
      await UserService.updateUser(token.user, name);
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
    }
  });

  test('É necessário que o nome seja diferente', async () => {
    const update = 0;
    UserModel.updateUser.mockImplementation(() => Promise.resolve(update))
    try {
      await UserService.updateUser(token.user, 'Nome Atualizado')
    } catch (e) {
      expect(e.status).toEqual(CODE.CONFLICT);
      expect(e.message).toEqual('Não foi possível atualizar o nome');
    }
  });

  test('É atualizado o nome com sucesso', async () => {
    const update = 1;
    UserModel.updateUser.mockImplementation(() => Promise.resolve(update))
    const response = await UserService.updateUser(token.user, 'Nome Atualizado')
    expect(response.statusCode).toEqual(CODE.ACCEPTED);
    expect(response.message).toEqual('Atualização concluída com sucesso');
  });
});
