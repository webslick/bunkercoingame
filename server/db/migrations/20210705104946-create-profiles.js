'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      date_loss_game: {
        type: Sequelize.DATE
      },  
      hints: {
        type: Sequelize.STRING
      },
      energy: {
        type: Sequelize.STRING
      },     
      balance_count: {
        type: Sequelize.STRING
      }, 
      score: {
        type: Sequelize.STRING
      }, 
      partnerLink: {
        type: Sequelize.STRING
      },  
      partners: {
        type: Sequelize.TEXT('long')
      },  
      partners_twolevel: {
        type: Sequelize.TEXT('long')
      },  
      history: {
        type: Sequelize.TEXT('long')
      },   
      boardstate: {
        type: Sequelize.TEXT('long')
      },   
      nastavnik: {
        type: Sequelize.TEXT('long')
      },   
      privateKey: {
        type: Sequelize.STRING
      },  
      subKey: {
        type: Sequelize.STRING
      },  
      wait: {
        type: Sequelize.BOOLEAN
      },
      bestGame: {
        type:Sequelize.TEXT('long')
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
    await queryInterface.dropTable('Profiles');
  }
};