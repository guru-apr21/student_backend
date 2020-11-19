module.exports = (sequelize, Sequelize) => {
    const User= sequelize.define("user", {
     
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          unique:true
        }
      },
     
      password: {
        type: Sequelize.STRING,
      },

      displayName:{
        type:Sequelize.STRING
      }
      
    })
   
    
    
  return User;
  };
