const conn = require('../config/conn');

const createUser = async (name, email, password, role) => {
  const newUser = await conn.execute(
    `
    INSERT INTO users(name, email, password, role) 
    VALUES ('${name}', '${email}', '${password}', '${role}');
    `,
  );
  console.log(newUser);
  return { email, password };
};

const getByEmail = async (emailInput) => {
  const [[user]] = await conn.execute(
    `SELECT * FROM users WHERE email LIKE('${emailInput}') LIMIT 1;`,
  );
  return user;
};

const editUser = async (name, id) => {
  await conn.execute(
    `
    UPDATE users
    SET name = '${name}'
    WHERE id = ${id};
    `,
  );
};

module.exports = { 
  createUser,
  getByEmail,
  editUser,
 };
