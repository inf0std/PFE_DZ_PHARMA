const express = require("express");
const cors = require("cors");

const userRouter = require("./src/router/userRouter/userRouter");
const apiV1Router = require("./src/api/v1");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/user", userRouter);
app.use("/api/v1", apiV1Router);

app.get("/", (req, res) => {
  console.log("connection attempt");
  res.send("hello to pharma dz");
});
app.listen(8080, () => {
  console.log("listening on port 8080");
});
