require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Move bodyParser require here

const userRouter = require("./src/router/userRouter");
const pharmaRouter = require("./src/router/pharmaRouter");
const medRouter = require("./src/router/medRouter");
const authRouter = require("./src/router/auth");
const searchRouter = require("./src/router/search");
const app = express();
app.use(cors());
// Place bodyParser before the router middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use("/auth/v1", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/pharmacy", pharmaRouter);
app.use("/api/v1/medicaments", medRouter);
app.use("/api/v1/search", searchRouter);

//starting server
app.listen(8000, () => {
  console.log("listening on port 8080");
});
