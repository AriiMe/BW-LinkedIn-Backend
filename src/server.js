const express = require("express");
const database = require("./database");
const cors = require("cors");
const authenticate = require("./auth");

const crudsRoute = require("./cruds");

const server = express();
const port = process.env.PORT || 9001;

server.use(cors());
server.use(express.json());

server.use("/api", crudsRoute);

database.sequelize.sync({ force: true }).then((result) => {
  server.listen(port, () => {
    console.log("Server is running on: " + port);
  });
});
