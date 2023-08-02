require("dotenv").config();

module.exports = (() => {
  //estabilishing connection to the postgresql dbms
  const db = require("knex")({
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "",
      database: "knex-test",
    },
  });
  return db;
})();
