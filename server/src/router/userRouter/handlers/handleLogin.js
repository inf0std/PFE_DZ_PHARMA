const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = handleLogin = (db) => (req, res) => {
  const { email, password } = req.body;
  db.form("users")
    .select("*")
    .where("email", "=", email)
    .then((user) => {
      if (user) {
        if (bcrypt.compare(password, user.password)) {
          res.json({ connected: true, data: { ...user, token: "" } });
          return;
        } else {
          res.json({
            connected: false,
            data: { error: "unvalid credentials" },
          });
          return;
        }
      } else {
        res.json({ connected: false, data: { error: "no, such user" } });
        return;
      }
    });
};
