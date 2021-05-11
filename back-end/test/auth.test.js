const messages = require('../helpers/dictonary');
const { auth: { service } } = require('../resources');

describe('AUTH SERVICE TEST', async () => {

  const users = [
    { name: 'Tryber Admin', email: 'tryber@trybe.com.br', password: '123456', role: 'administrator' },
    { name: 'testuser', email: 'user@test.com', password: 'test123', role: 'client'}
  ];

  it('Será validado que o campo "email" é obrigatório', async () => {
    await service.login(undefined, users[0].password)
      .then((result) => {
        const { error, message } = result;
        expect(error).toBeTruthy();
        expect(message).toBe(messages.emailOrPasswordInvalid);
      });
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    await service.login(users[0].email, undefined)
      .then((result) => {
        const { error, message } = result;
        expect(error).toBeTruthy();
        expect(message).toBe(messages.emailOrPasswordInvalid);
      });
  });

  it('Será validado que não é possível fazer login com um email inválido', async () => {
    await service.login('emailInvalido', users[0].password)
      .then((result) => {
        const { error, message } = result;
        expect(error).toBeTruthy();
        expect(message).toBe(messages.emailOrPasswordInvalid);
      });
  });

  it('Será validado que não é possível fazer login com uma senha inválida', async () => {
    await service.login(users[0].email, '1a')
      .then((result) => {
        const { error, message } = result;
        expect(error).toBeTruthy();
        expect(message).toBe(messages.emailOrPasswordInvalid);
      });
  });

  it('Será validado que é possível fazer login como admin com sucesso', async () => {
    await service.login(users[0].email, users[0].password)
    .then((result) => {
      const { payload } = result;
      expect(payload.name).toBe(users[0].name);
      expect(payload.email).toBe(users[0].email);
      expect(payload.role).toBe(users[0].role);
      expect(payload.token).not.toBeNull();
    });
  });

  it('Será validado que é possível fazer login como client com sucesso', async () => {
    await service.login(users[1].email, users[1].password)
    .then((result) => {
      const { payload } = result;
      expect(payload.name).toBe(users[1].name);
      expect(payload.email).toBe(users[1].email);
      expect(payload.role).toBe(users[1].role);
      expect(payload.token).not.toBeNull();
    });
  });
});
