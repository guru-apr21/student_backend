const {Information }= require('../models')
//students record are created

exports.create = async(req, res) => {
    let student = {};

  
  try{

        student.firstname = req.body.firstname;
        student.lastname = req.body.lastname;
        student.dob = req.body.dob;
        student.gender= req.body.gender;
        student.age = req.body.age;
        student.section = req.body.section;
        student.contact = req.body.contact;
        student.mark = req.body.mark;
        student.attendance=req.body.attendance

await Information.create(student).then(result => {    
            
            res.status(200).json({
                message: "Upload Successfully a User with id = " + result.id,
                student: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}
exports.retrieveAllStudents = async (req, res) => {
    
    // find all Students information from 
   await Information.findAll()
        .then(studentInfos => {
            res.status(200).json({
                message: "Get all Student' Infos Successfully!",
                students: studentInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

           res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getStudentById = async(req, res) => {
    // find all Student information from ID
    let studentId = req.params.id;
     await Information.findByPk(studentId)
        .then(student => {
            res.status(200).json({
                message: " Successfully Get a Student with id = " + studentId,
                students: student
            });
        })
        . catch(error => {
          // log on console
          console.log(error);
  
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
  }



