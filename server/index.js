const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const handleLogin = require('./loginHandler'); // Chemin vers votre fichier de gestionnaire de connexion
const handleRegister = require('./registerHandler'); // Chemin vers votre fichier de gestionnaire d'inscription
const deleteHandler = require('./deleteHandler');
const { isAuthenticated } = require('./middlewares'); // Inclure le middleware d'authentification approprié
const updateHandler = require('./updateHandler');


// Utilisez le middleware body-parser pour analyser le corps des requêtes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRouter = require("./src/router/userRouter/userRouter");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors);

app.use("/user", userRouter);

// Utilisez le middleware body-parser pour analyser le corps des requêtes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//la fonction app.post() pour définir une route de connexion 
app.post('/login', handleLogin);

// Définition de la route d'inscription
app.post('/register', handleRegister);

// Route de suppression d'un utilisateur avec vérifications d'authentification et d'autorisation
app.delete('/users/:id', isAuthenticated, deleteHandler);

// Route de mise à jour d'un utilisateur
app.put('/users/:id', updateHandler);

app.listen(8080, () => {
  console.log("listening on port 8080");
});
