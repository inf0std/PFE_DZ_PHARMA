//les package installe
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const handleLogin = require("./loginHandler"); // Chemin vers votre fichier de gestionnaire de connexion
const handleRegister = require("./registerHandler"); // Chemin vers votre fichier de gestionnaire d'inscription
const deleteHandler = require("./deleteHandler");
const { isAuthenticated } = require("./middlewares"); // Inclure le middleware d'authentification approprié
const updateHandler = require("./updateHandler");

// Utilisez le middleware body-parser pour analyser le corps des requêtes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRouter = require("./src/router/userRouter/userRouter");
const apiV1Router = require("./src/api/v1");
const db = require("./src/models/db");

const app = express();
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
