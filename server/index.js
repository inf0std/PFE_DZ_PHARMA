require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Move bodyParser require here

const userRouter = require("./src/router/userRouter");
const pharmaRouter = require("./src/router/pharmaRouter");
const app = express();
app.use(cors());
// Place bodyParser before the router middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.use(userRouter);
app.use(pharmaRouter);

//starting server
app.listen(8080, () => {
  console.log("listening on port 8080");
});
