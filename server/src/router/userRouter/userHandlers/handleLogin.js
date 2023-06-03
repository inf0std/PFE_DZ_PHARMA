/*const handleLogin = (req, res)=>{
    res.json({id : 0111});
}

module.exports = handleLogin;*/

const validator = require('validator');
// loginHandler.js

function handleLogin(req, res) {
    const { username, password } = req.body;
  
    // Validation des champs
  if (!username || !password) {
    res.status(400).send('Veuillez fournir un nom d\'utilisateur et un mot de passe.');
    return;
  }

  // Validation des règles supplémentaires
  if (!validator.isAlphanumeric(username)) {
    res.status(400).send('Le nom d\'utilisateur ne doit contenir que des caractères alphanumériques.');
    return;
  }

  if (!validator.isLength(password, { min: 8 })) {
    res.status(400).send('Le mot de passe doit comporter au moins 8 caractères.');
    return;
  }

  // verification de la presence des caracters speciaux
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
if (!hasSpecialChars) {
  res.status(400).send('Le mot de passe doit contenir au moins un caractère spécial.');
  return;
}

// vérification si le mot de passe contient à la fois des lettres majuscules et des lettres minuscules.
const hasUppercase = /[A-Z]/.test(password);
const hasLowercase = /[a-z]/.test(password);
if (!hasUppercase || !hasLowercase) {
  res.status(400).send('Le mot de passe doit contenir à la fois des lettres majuscules et des lettres minuscules.');
  return;
}
    // Effectuer la vérification des informations d'identification
    if (username === 'utilisateur' && password === 'motdepasse') {
      // Connexion réussie
      res.send('Connexion réussie !');
    } else {
      // Informations d'identification incorrectes
      res.status(401).send('Informations d\'identification incorrectes');
    }
  }
  
  module.exports = handleLogin;
  