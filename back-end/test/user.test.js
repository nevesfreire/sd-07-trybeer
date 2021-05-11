const { user: { service } } = require('../resources');

describe('USER SERVICE TEST', () => {

  const users = [
    { name: 'Tryber Admin', email: 'tryber@trybe.com.br', password: '123456', role: 'administrator' },
    { name: 'testuser', email: 'user@test.com', password: 'test123', role: 'client'}
  ];

  it('Será validado que é possível listar todos os usuários', async () => {
    await service.getAll()
    .then((result) => {
      expect(result[0].id).toBe(1);
      expect(result[0].name).toBe(users[0].name);
      expect(result[0].email).toBe(users[0].email);
      expect(result[0].password).toBe(users[0].password);
      expect(result[0].role).toBe(users[0].role);
      expect(result[1].id).toBe(2);
      expect(result[1].name).toBe(users[1].name);
      expect(result[1].email).toBe(users[1].email);
      expect(result[1].password).toBe(users[1].password);
      expect(result[1].role).toBe(users[1].role);
      });
  });

  it('Será validado que é possível buscar um usuário por email', async () => {
    await service.getByEmail(users[0].email)
    .then((result) => {
      expect(result.id).toBe(1);
      expect(result.name).toBe(users[0].name);
      expect(result.email).toBe(users[0].email);
      expect(result.password).toBe(users[0].password);
      expect(result.role).toBe(users[0].role);
    });
  });

  it('Será validado que ao buscar um usuário por email inválido', async () => {
    await service.getByEmail('EmailInexistente')
    .then((result) => {
      expect(result).toBeUndefined();
    });
  });
});
