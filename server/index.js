//les package installe
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRouter = require("./src/router/userRouter/userRouter");
const apiV1Router = require("./src/api/v1");
const db = require("./src/models/db");

const app = express();

//midlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//routers
app.use("/user", userRouter);
app.use("/api/v1", apiV1Router);

app.get("/", (req, res) => {
  console.log("connection attempt");
  res.send("hello to pharma dz");
});
app.use("/product", productRouter);

//starting server
app.listen(8080, () => {
  console.log("listening on port 8080");
});
