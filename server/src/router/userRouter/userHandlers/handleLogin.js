const db = require("../../../models/db");

const handleLogin = (req, res) => {
  const { username, password } = req.body;
  let con = db.getConnection();

  con("users")
    .select("*")
    .where("username", username)
    .then((record) => {
      console.log(record);
      res.json(record);
    });
};

module.exports = handleLogin;
