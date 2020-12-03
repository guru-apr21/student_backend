const { Model } = require('sequelize');
const {Instructor}=require('./instructor')


 module.exports = (sequelize, DataTypes) => {
  class Course extends Model {static associate(models){
    this.hasMany(models.Enroll)
    this.hasMany(models.Lecture)
    this.hasMany(models.Question)
    this.belongsTo(models.Instructor)


  }}
  
  Course.init({

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
  iid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
        notNull: {
            msg: "userID cannot be empty"
        }
    },
            
},
    price: {
    type: DataTypes.INTEGER
  },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.STRING,
    },
   
    logo:{
      type:DataTypes.STRING
    },
    cover:{
        type:DataTypes.STRING
      },
      suggestions:{
        type:DataTypes.STRING
      },
      date:{
        type:DataTypes.DATE,
        default:Date.now
      },
    nStudents: { type: DataTypes.INTEGER, default: 0 },
    nLectures: { type: DataTypes.INTEGER, default: 0 },
    nQuestions: { type: DataTypes.INTEGER, default: 0 },


  }, {
    sequelize,
    modelName: 'Course'
  })
  console.log(Course === sequelize.models.Course); // true

  // Course.associate = (models) => {
  //   Course.belongsTo(models.Enroll, {
  //       foreignKey: "cid",
  //       localfield:"_id"
  //   })
  // }
  //   Course.associate = (models) => {
  //     Course.belongsTo(models.Lecture, {
  //         foreignKey: "cid",
  //         localfield:"_id"
  //     })
    
  //   }
  //   Course.associate = (models) => {
  //     Course.belongsTo(models.Question, {
  //         foreignKey: "cid",
  //         localfield:"_id"
  //     })
    
  //   }
  
 return Course;
};
 