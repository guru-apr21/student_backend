const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/authcontrol')
const student = require('../controllers/usercontrol')

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/tokenIsValid')
router.post('/create',student.create);
router.post('/all',student.retrieveAllStudents);
router.post('/onebyid/:id',student.getStudentById);
router.post('/update/:id',student.updateById)
router.post('/delete/:id',student.deleteById)


 module.exports=router;


