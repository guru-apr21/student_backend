const {User }= require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  {
  createJWT
   
} = require("../middleware/auth");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/*For Signup first it check the validation and 
then it check whether the email is already exit 
or not if email is not exited it will encrypt the password and store to the database*/

exports.signup = async (req, res, next) => {
  console.log(req)
  let { name, email, password, password_confirmation } = req.body;
  let errors = [];
  // validation of signup
  if (!name) {
    errors.push({ name: "required" });
  }
  
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
     password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
     }
  console.log(User);
   User.findOne({where:{
     email:req.body.email
 }})
    .then(user=>{
       if(user){
          return res.status(422).json({ errors: [{ user: "email already exists" }] });
       }else {
         const user = new User({
           name: name,
           email: email,
           password: password,
         });
 bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
         if (err) throw err;
         user.password = hash;
         user.save()
             .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
             })
             .catch(err => {
               res.status(500).json({
                  errors: [{ error: err }]
               });
            });
         });
      });
     }
  }).catch(err =>{
      res.status(500).json({
        errors: [{ error: 'test' }]
      });
  })
}

/*For signin the user it compare whether the email 
and password are correct and 
it generate the unique token for the user*/

exports.signin = async (req, res) => {
     let { email, password } = req.body;
     let errors = [];
     //validation
     if (!email) {
       errors.push({ email: "required" });
     }
     if (!emailRegexp.test(email)) {
       errors.push({ email: "invalid email" });
     }
     if (!password) {
       errors.push({ passowrd: "required" });
     }
     if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
     }
   await User.findOne({ where:{ email:req.body.email}}).then(user => {
    console.log(user,"errrrrrr")
        if (!user) {
          return res.status(404).json({
            errors: [{ user: "not found" }],
          });
        } else {
           bcrypt.compare(password, user.password).then(isMatch => {
              if (!isMatch) {
               return res.status(400).json({ errors: [{ password:
"incorrect" }] 
               });
              }
       let access_token = createJWT(
          user.email,
          user._id,
          3600
          
       );
       jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
decoded) => {
         if (err) {
           console.log("first err",err)
            res.status(500).json({ errors: err });
         }
         if (decoded) {
             return res.status(200).json({
                success: true,
                token: access_token,
                message: user
             });
           }
         });
        }).catch(err => {
          console.log("second err",err)
          
          res.status(500).json({ errors: err });
        });
      }
   }).catch(err => {
     console.log("thired error",err)
      res.status(500).json({ errors: err });
   });
}
//verify the token  

exports.tokenIsValid= async (req, res) => {
  try {
    console.log(req,"yyyyy");
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findByPk(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    console.log(err,"ttttt")
    res.status(500).json({ error: err.message });
  }
};

//Get the Token by ID
exports.getAll= async (req, res) => {
  try {
    console.log(req,"kkkk")
    const user = await User.findByPk(req.user);
  res.json({
   // displayName: user.displayName,
    id: user._id,
      
  });
  } catch (err) {
    console.log(err,"ssss")
    res.status(500).json({ error: err.message });
  }
};