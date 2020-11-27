const { Model} = require('sequelize');

 module.exports = (sequelize, DataTypes) => {
  class Information extends Model {}
  
  Information.init({
              id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
               
        
                firstname:{
                    type:DataTypes.STRING
                },
                lastname:{
                    type:DataTypes.STRING
                },
                
                 dob: { 
                     type: DataTypes.DATEONLY
                      },

                gender: {
                    type:DataTypes. STRING,
                    enum : ['male', 'female', 'other'],
                    },
                age:{
                    type:DataTypes.INTEGER
                },
                section:{
                   type:DataTypes.STRING
                },
                contact:{
                    type:DataTypes.INTEGER
                },
                mark:{
                    type:DataTypes.INTEGER
                   
        
                },
                attendance:{
                    type:DataTypes.STRING
                }
  }, {
    sequelize,
    modelName: 'Information'
  })
  console.log(Information === sequelize.models.Information); // true

 

  return Information;
};
 