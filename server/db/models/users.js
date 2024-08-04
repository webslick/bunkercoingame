'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class Users extends Model {  
    static associate(models) { 
      Users.hasOne(models.Profiles, { foreignKey: 'id', as: 'Profiles' });         
      // Users.hasOne(models.AuthInfos, { foreignKey: 'authId', as: 'AuthInfos' });  
      // Users.hasOne(models.Wallets, { foreignKey: 'walletId', as: 'Wallets' }); 
      // Users.hasMany(models.Pages, { foreignKey: 'userId', as: 'Pages' }); 
      // Users.hasOne(models.Subscribes, { foreignKey: 'subId', as: 'Subscribes' });  
    }
  }
  
  Users.init({}, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};

 

