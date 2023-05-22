const express = require("express");
const handlers = require("./userHandlers/handlers");

const userRouter = express.Router();

userRouter.post("/login", handlers.loginHandler);
userRouter.post("/register", handlers.registerHandler);
userRouter.post("/update", handlers.updateHandler);
userRouter.post("/delete", handlers.deleteHandler);

module.exports = userRouter;
