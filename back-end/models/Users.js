module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(20),
    role: DataTypes.STRING(20),
  });
  return Users;
};
