const UserService = require('../services/UserService');
const UserModel = require('../models/UserModel');
const token = require('./configs/token');
const CODE = require('../helper/statusCodes');
jest.mock('../models/UserModel');

describe('2 - User Service - Criar Usuário', () => {
  let register = {};
  beforeEach(() => {
    register = {
      name: 'Usuario Comum',
      email: 'usuario@email.com',
      password: 'psw123',
      role: false,
    };
  });

  test('O campo name é obrigatório', async () => {
    delete register.name;
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('Campo "name" é obrigatório')
    }
  });

  test('Não é possível registar usuário com caracteres especiais no nome', async () => {
    register.name = 'Usu@rio Comum';
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('O campo name não pode conter caracters especiais')
    }
  });

  test('Não é possível registar usuário com nome menor que 12 caracteres', async () => {
    register.name = 'usuario';
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('O campo "name" deve ter pelo menos 12 caracteres',)
    }
  });

  test('Não é possível registar usuário com nome contendo números', async () => {
    register.name = 'Usuario Comum 123';
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('O campo "name" não pode conter números',)
    }
  });

  test('O campo email é obrigatório', async () => {
    delete register.email;
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('Campo "email" é obrigatório')
    }
  });

  test('Não é possível registar usuário com email inválido', async () => {
    register.email = 'usuario@email';
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('Formato de e-mail inválido',)
    }
  });

  test('O campo password é obrigatório', async () => {
    delete register.password;
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('Campo "password" é obrigatório')
    }
  });

  test('Não é possível registar usuário com passord menor que 8 caracteres', async () => {
    register.password = '12345';
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('O campo "password" deve ter pelo menos 6 caracteres',)
    }
  });

  test('Não é possível registar usuário com passord maior que 20 caracteres', async () => {
    register.password = '012345678901234567890';
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('O campo "password" deve ter no máximo 20 caracteres',)
    }
  });

  test('O campo role é obrigatório', async () => {
    delete register.role;
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('Campo "role" é obrigatório')
    }
  });

  test('O campo role deve ser um boolean', async () => {
    register.role = 'admin';
    const { name, email, password, role } = register;
    try {
      await UserService.create(name, email, password, role)
    } catch (e) {
      expect(e.status).toEqual(CODE.BAD_REQUEST);
      expect(e.message).toEqual('Regra de usuário deve ser um "boolean"')
    }
  });

  test('É possível cadastar um usuário com sucesso', async () => {
    const { name, email, password, role } = register;
    UserModel.create.mockImplementation(() => Promise.resolve());
    const response = await UserService.create(name, email, password, role)
    expect(response.statusCode).toEqual(CODE.CREATED);
    expect(response.message).toEqual('Usuario criado com sucesso!')
  });

  test('É possível cadastar um usuário administrador com sucesso', async () => {
    register.role = true;
    const { name, email, password, role } = register;
    UserModel.create.mockImplementation(() => Promise.resolve());
    const response = await UserService.create(name, email, password, role)
    expect(response.statusCode).toEqual(CODE.CREATED);
    expect(response.message).toEqual('Usuario criado com sucesso!')
  });
});
