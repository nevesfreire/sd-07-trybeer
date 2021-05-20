module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: DataTypes.DATE,
  });
  Sales.associate = (models) => {
    Sales.hasMany(models.Users, { foreignKey: 'id', as: 'user_id' });
  };
  return Sales;
};