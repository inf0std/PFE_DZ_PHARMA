/*const handleRegister = (req, res) => {
  res.json({ id: 10 });
};

module.exports = handleRegister;*/
const mysql = require("mysql2");
const validator = require("validator");
// registerHandler.js
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_database_user",
  password: "your_database_password",
  database: "your_database_name",
});

function handleRegister(req, res) {
  // Extraire les données de la requête POST
  const { username, email, password } = req.body;

  // Validation des champs

  if (!validator.isEmail(email)) {
    // Gestion de l'erreur de validation de l'e-mail
    return res.status(400).json({ error: "L'adresse e-mail n'est pas valide" });
  }

  if (!validator.isLength(password, { min: 8 })) {
    // Gestion de l'erreur de validation du mot de passe
    return res
      .status(400)
      .json({ error: "Le mot de passe doit contenir au moins 8 caractères" });
  }

  // verification de la presence des caracters speciaux
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!hasSpecialChars) {
    res
      .status(400)
      .send("Le mot de passe doit contenir au moins un caractère spécial.");
    return;
  }

  // vérification si le mot de passe contient à la fois des lettres majuscules et des lettres minuscules.
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  if (!hasUppercase || !hasLowercase) {
    res
      .status(400)
      .send(
        "Le mot de passe doit contenir à la fois des lettres majuscules et des lettres minuscules."
      );
    return;
  }

  if (!validator.isAlphanumeric(username)) {
    // Gestion de l'erreur de validation du nom d'utilisateur
    return res
      .status(400)
      .json({
        error:
          "Le nom d'utilisateur ne doit contenir que des lettres et des chiffres",
      });
  }

  //Vérification de l'existence de l'utilisateur

  // Exécutez la requête pour rechercher un utilisateur avec l'e-mail fourni
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        // Gestion de l'erreur de base de données
        return res
          .status(500)
          .json({
            error:
              "Erreur lors de la vérification de l'existence de l'utilisateur",
          });
      }

      if (results.length > 0) {
        // L'utilisateur existe déjà
        return res
          .status(400)
          .json({ error: "Un utilisateur avec cet e-mail existe déjà" });
      }

      // L'utilisateur n'existe pas, continuez le processus d'inscription
      // ...
    }
  );

  // Effectuer le processus d'inscription
  // ...
  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ...

  // Validation de l'adresse e-mail
  if (!isEmailValid(email)) {
    res.status(400).send("Veuillez fournir une adresse e-mail valide.");
    return;
  }

  //hachage du mot de passe
  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      // Gestion de l'erreur de hachage
      return res
        .status(500)
        .json({ error: "Erreur lors du hachage du mot de passe" });
    }

    // Le mot de passe est correctement haché, continuez le processus d'inscription
    // ...
  });

  // Génération du jeton d'authentification
  const jwt = require("jsonwebtoken");

  // ...
  const secretKey = "your-secret-key";
  const token = jwt.sign({ userId: newUser.id }, secretKey, {
    expiresIn: "1h",
  });

  // l'envoi de l'email de confermation

  // Fonction pour envoyer l'e-mail de confirmation
  function sendConfirmationEmail(email) {
    // Configuration du transporteur de messagerie
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "votre-email@gmail.com", // Remplacez par votre adresse e-mail
        pass: "votre-mot-de-passe", // Remplacez par votre mot de passe
      },
    });

    // Options de l'e-mail
    const mailOptions = {
      from: "votre-email@gmail.com", // Remplacez par votre adresse e-mail
      to: email, // Adresse e-mail du destinataire
      subject: "Confirmation d'inscription",
      text: "Merci de vous être inscrit à notre application. Veuillez cliquer sur le lien suivant pour confirmer votre inscription : https://exemple.com/confirmation",
    };

    // Envoi de l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("E-mail de confirmation envoyé : " + info.response);
      }
    });
  }
  /*Notez que l'envoi d'e-mails depuis un serveur local peut être plus complexe en raison des restrictions des
 fournisseurs de messagerie. Vous devrez peut-être configurer des paramètres supplémentaires pour permettre 
l'envoi d'e-mails depuis votre environnement de développement local. */

  // Appel de la fonction d'envoi d'e-mail de confirmation
  sendConfirmationEmail(email);

  // Répondre avec succès
  res.send("Inscription réussie !");
}

module.exports = handleRegister;
