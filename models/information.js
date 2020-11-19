module.exports = (sequelize, Sequelize) => {
    //const User=require("./student.model")
    const Information= sequelize.define("info", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
       

        firstname:{
            type:Sequelize.STRING
        },
        lastname:{
            type:Sequelize.STRING
        },
        
         dob: { 
             type: Sequelize.DATEONLY
              },
        age:{
            type:Sequelize.INTEGER
        },
        mark:{
            type:Sequelize.INTEGER

        },
        attendance:{
            type:Sequelize.INTEGER
        },
    })


    return Information
}