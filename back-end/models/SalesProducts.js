module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('Sales_Products',
    {quantity: DataTypes.STRING(10)},
    { timestamps: false },
  );

  SalesProducts.associate = (models) => {
    models.Sales.belongsToMany(models.Products, {
      as: 'Products',
      through: SalesProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.Products.belongsToMany(models.Sales, {
      as: 'Sales',
      through: SalesProducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  };

  return SalesProducts;
};