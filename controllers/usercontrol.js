const { Information } = require('../models');
//students record are created and save in to database

exports.create = async (req, res) => {
  let student = {};
  const {
    firstname,
    lastname,
    dob,
    gender,
    age,
    section,
    contact,
    mark,
    attendance,
  } = req.body;

  try {
    student = {
      firstname,
      lastname,
      dob,
      gender,
      age,
      section,
      contact,
      mark,
      attendance,
    };

    await Information.create(student).then((result) => {
      res.status(200).json({
        message: 'Upload Successfully a User with id = ' + result.id,
        student: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: 'Fail!',
      error: error.message,
    });
  }
};
exports.retrieveAllStudents = async (req, res) => {
  // find all Students information from
  await Information.findAll()
    .then((studentInfos) => {
      res.status(200).json({
        message: "Get all Student' Infos Successfully!",
        students: studentInfos,
      });
    })
    .catch((error) => {
      // log on console
      console.log(error);

      res.status(500).json({
        message: 'Error!',
        error: error,
      });
    });
};

exports.getStudentById = async (req, res) => {
  // find all Student information from ID
  let studentId = req.params.id;
  await Information.findByPk(studentId)
    .then((student) => {
      res.status(200).json({
        message: ' Successfully Get a Student with id = ' + studentId,
        students: student,
      });
    })
    .catch((error) => {
      // log on console
      console.log(error);

      res.status(500).json({
        message: 'Error!',
        error: error,
      });
    });
};
//update a student record in to database
exports.updateById = async (req, res) => {
  try {
    let studentId = req.params.id;
    let student = await Information.findByPk(studentId);

    if (!student) {
      // return a response to client
      res.status(404).json({
        message: 'Not Found for updating a customer with id = ' + studentId,
        student: '',
        error: '404',
      });
    } else {
      // update new change to database
      let updatedObject = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        gender: req.body.gender,
        age: req.body.age,
        section: req.body.section,
        contact: req.body.contact,
        mark: req.body.mark,
        attendance: req.body.attendance,
      };
      let result = await Information.update(updatedObject, {
        returning: true,
        where: { id: studentId },
      });

      // return the response to client
      if (!result) {
        res.status(500).json({
          message:
            'Error -> Can not update a student with id = ' + req.params.id,
          error: 'Can NOT Updated',
        });
      }

      res.status(200).json({
        message: 'Update successfully a Student with id = ' + studentId,
        student: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error -> Can not update a student with id = ' + req.params.id,
      error: error.message,
    });
  }
};
//delete the student record in DB

exports.deleteById = async (req, res) => {
  try {
    let studentId = req.params.id;
    let student = await Information.findByPk(studentId);

    if (!student) {
      res.status(404).json({
        message: 'Does Not exist a Student with id = ' + studentId,
        error: '404',
      });
    } else {
      await student.destroy();
      res.status(200).json({
        message: 'Delete Successfully a Student with id = ' + studentId,
        student: student,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error -> Can NOT delete a Student with id = ' + req.params.id,
      error: error.message,
    });
  }
};
