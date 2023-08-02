/*const handleUpdate = (req, res) => {
  res.json({ res: true });
};

module.exports = handleUpdate;*/

const User = require('./models/User');

const updateHandler = (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  // Vérification de l'existence de l'utilisateur
  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la recherche de l\'utilisateur' });
    }

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Mise à jour des informations de l'utilisateur
    user.username = username || user.username;
    user.email = email || user.email;

    // Enregistrer les modifications dans la base de données
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
      }

      res.status(200).json(updatedUser);
    });
  });
};

module.exports = updateHandler;

