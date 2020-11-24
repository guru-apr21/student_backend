const { Model } = require('sequelize');

 

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  
  User.init({

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
    name: {
    type: DataTypes.STRING
  },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
    },
    
    
    // displayName:{
    //   type:DataTypes.STRING
    // }
  }, {
    sequelize,
    modelName: 'User'
  })
  console.log(User === sequelize.models.User); // true

 

  return User;
};
 