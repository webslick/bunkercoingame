'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Profiles.init({
    user_id: DataTypes.STRING,
    user_name: DataTypes.STRING, 
    date_loss_game: DataTypes.DATE, 
    hints: DataTypes.STRING,     
    energy: DataTypes.STRING,     
    balance_count: DataTypes.STRING,     
    score: DataTypes.STRING,     
    partnerLink: DataTypes.STRING(400),
    partners: DataTypes.STRING,
    partners_twolevel: DataTypes.STRING,
    history: DataTypes.STRING, 
    nastavnik: DataTypes.STRING,  
    privateKey: DataTypes.STRING,  
    subKey: DataTypes.STRING,  
    bestGame: DataTypes.STRING,  
  }, {
    sequelize,
    modelName: 'Profiles',
  });
  return Profiles;
};
 