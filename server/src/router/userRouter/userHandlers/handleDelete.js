/*const handleDelete = (req, res) => {
  res.json({ res: true });
};

module.exports = handleDelete;*/

const deleteHandler = (req, res) => {
  const userId = req.params.id;

  // Vérification de l'authentification
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Non authentifié' });
  }

  // Vérification de l'autorisation
  if (req.user.id !== userId) {
    return res.status(403).json({ error: 'Accès refusé' });
  }

  // Suppression de l'utilisateur dans la base de données
  User.findByIdAndRemove(userId, (err, deletedUser) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }

    if (!deletedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  });
};

module.exports = deleteHandler;

