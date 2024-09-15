'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class Users extends Model {  
    static associate(models) { 
      Users.hasOne(models.Profiles, { foreignKey: 'id', as: 'Profiles' });       
    }
  }
  
  Users.init({}, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};

 

