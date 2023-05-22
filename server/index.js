const express = require("express");
const cors = require("cors");

const userRouter = require("./src/router/userRouter/userRouter");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors);

app.use("/user", userRouter);
app.listen(8080, () => {
  console.log("listening on port 8080");
});
