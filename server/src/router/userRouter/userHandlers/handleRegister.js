const db = require("../../../models/db");
const bcrypt = require("bcrypt");
const handleRegister = (req, res) => {
  const { username, password, email, phone, adress, birthDate } = req.body;
  let pwdHash;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
      } else {
        pwdHash = hash;
      }
    });
  });
  let con = db.getConnection();
  con("users")
    .insert({ username: username, password: pwdHash })
    .then((record) => console.log)
    .catch((err) => console.log);
};

module.exports = handleRegister;
