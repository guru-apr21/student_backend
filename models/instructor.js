const { Model} = require('sequelize');
const {User}=require('../models/user')

 module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    static associate(models){
        this.hasOne(models.Course)

      }
  }
  
  Instructor.init({
              id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                uid: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        notNull: {
                            msg: "userID cannot be empty"
                        }
                    },
                    references: {
                        model: User,
                        key: "id"
                    }            
                },
               
                bio: {type:DataTypes.STRING},
                twitter: {type:DataTypes.STRING},
                fb: {type:DataTypes.STRING},
                insta: {type:DataTypes.STRING},
                git: {type:DataTypes.STRING},
                others: {type:DataTypes.STRING},
                salary: { type: DataTypes.INTEGER, default: 0 },
                nCourses: { type: DataTypes.INTEGER, default: 0 },
                date: { type: DataTypes.DATE, default: Date.now },
              
  }, {
    sequelize,
    modelName: 'Instructor'
  })
  console.log(Instructor === sequelize.models.Instructor); // true

//   Instructor.associate = (models) => {
//     Instructor.belongsTo(models.Course, {
//         foreignKey: "iid",
//         localfield:"uid"
//     })
    
// }
 

  return Instructor;
};
 
//User.Information = User.belongsTo(Information);