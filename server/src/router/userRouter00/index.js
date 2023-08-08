const express = require("express");
const userRouter = express.Router();

module.exports = (db) => {
  const { loginHandler, registerHandler, updateHandler, deleteHandler } =
    require("./handlers")(db);

  userRouter.post("/login", loginHandler);
  userRouter.post("/register", registerHandler);
  userRouter.post("/update", updateHandler);
  userRouter.post("/delete", deleteHandler);
  return userRouter;
};
