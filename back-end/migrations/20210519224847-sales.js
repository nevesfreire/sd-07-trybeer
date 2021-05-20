'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sales', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(9,2),
        field: 'total_price'
      },
      deliveryAddress: {
        allowNull: false,
        type: Sequelize.STRING(100),
        field: 'delivery_address'
      },
      deliveryNumber: {
        allowNull: false,
        type: Sequelize.STRING(50),
        field: 'delivery_number',
      },
      saleDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'sale_date'
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
     return queryInterface.dropTable('Sales');
  },
};
