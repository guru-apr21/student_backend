const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
//require("./app/routes/student.routes") (app)
const inforouter=require('./routes/student.routes')
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use("/api/students", inforouter);


const db = require("./models/index");


//const { db } = require('./models/user');
//db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Student Management" });
});



// set port, listen for requests
db.sequelize.sync().then(()=>{
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

})