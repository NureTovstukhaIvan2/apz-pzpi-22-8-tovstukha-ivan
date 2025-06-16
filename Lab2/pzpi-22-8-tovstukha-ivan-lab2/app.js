const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./models");
const Role = db.role;
const User = db.user;

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync Database");
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Aquarium Monitoring System API" });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/aquarium.routes")(app);
require("./routes/device.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  // Створення ролей
  User.findOne({
    where: {
      email: "admin@gmail.com",
    },
  }).then((user) => {
    if (!user) {
      User.create({
        email: "admin@gmail.com",
        password: bcrypt.hashSync("11111111", 8),
        name: "Admin",
        role: "ADMIN",
      });
    }
  });
}
