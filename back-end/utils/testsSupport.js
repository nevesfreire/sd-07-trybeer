function createDataBase() {
  return 'CREATE DATABASE IF NOT EXISTS Trybeer;';
}

function createTableUsers() {
  const create = `CREATE TABLE IF NOT EXISTS Trybeer.users (
    id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(20) NOT NULL,
      role VARCHAR(20) NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY \`email_un\` (email));`;
  return create;
}

function insertUsers() {
  const insert = `INSERT INTO Trybeer.users (id, name, email, password, role)
      VALUES
      ('1', 'Tryber Admin', 'tryber@trybe.com.br', '123456', 'administrator'),
      ('2', 'testuser', 'user@test.com', 'test123', 'client');`;
  return insert;
}

function deleteTableUsers() {
  return 'DELETE FROM Trybeer.users;';
}

function autoIncrementTableUsers() {
  return 'ALTER TABLE Trybeer.users AUTO_INCREMENT = 1;';
}

module.exports = {
  createDataBase,
  createTableUsers,
  insertUsers,
  deleteTableUsers,
  autoIncrementTableUsers,
};

// 'DELETE FROM Trybeer.sales_products;';
// 'ALTER TABLE Trybeer.sales_products AUTO_INCREMENT = 1;';
// 'DELETE FROM Trybeer.sales;';
// 'ALTER TABLE Trybeer.sales AUTO_INCREMENT = 1;';
// 'DELETE FROM Trybeer.products;';
// 'ALTER TABLE Trybeer.products AUTO_INCREMENT = 1;';
