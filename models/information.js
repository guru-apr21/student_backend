const { Model} = require('sequelize');
const {User}=require('../models/user')

 module.exports = (sequelize, DataTypes) => {
  class Information extends Model {
    static associate(models){
        this.hasMany(models.Enroll)
    
      }
  }
  
  Information.init({
              id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
               
                date: { type: DataTypes.DATE, default: Date.now },
                nCourses: { type: DataTypes.INTEGER, default: 0 },

              
  }, {
    sequelize,
    modelName: 'Information'
  })
  console.log(Information === sequelize.models.Information); // true

//   Information.associate = (models) => {
//     Information.belongsTo(models.Enroll, {
//         foreignKey: "uid",
//         localfield: "uid"

//     })
    
// }
  return Information;
};
 
//User.Information = User.belongsTo(Information);