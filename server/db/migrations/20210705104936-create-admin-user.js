'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Admin_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, 
      chanels: {
        type: Sequelize.TEXT('long')
      },
      halving_earn: {
        type: Sequelize.STRING
      },
      halving_count: {
        type: Sequelize.STRING
      },
      count_coin_all: {
        type: Sequelize.STRING
      },  
      total_coin_mine: {
        type: Sequelize.STRING
      },  
      toogle_status_bot: {
        type: Sequelize.BOOLEAN
      },
      admin_tg_ids: {
        type: Sequelize.STRING
      },     
      bonus: {
        type: Sequelize.STRING
      }, 
      task_main: {
        type: Sequelize.TEXT('long')
      }, 
      tasks: {
        type: Sequelize.TEXT('long')
      },  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Admin_users');
  }
};