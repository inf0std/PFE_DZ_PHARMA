const express = require("express");
const handlers = require("./userHandlers/handlers");
module.exports = (db) => {
  const { showHandler, createHandler, updateHandler, deleteHandler } =
    require("./Handlers")(db);
  const userRouter = express.Router();

  userRouter.post("/create", createHandler);
  userRouter.get("/show", showHandler);
  userRouter.post("/update", updateHandler);
  userRouter.post("/delete", deleteHandler);
  return userRouter;
};
