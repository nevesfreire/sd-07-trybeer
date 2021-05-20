module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts',
    {quantity: DataTypes.STRING(10)},
    { timestamps: false },
  );

  SalesProducts.associate = (models) => {
    models.Products.belongsToMany(models.User, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.User.belongsToMany(models.Book, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };
  
  return SalesProducts;
};