const knex = require("knex");

module.exports = {
  getConnection: () =>
    knex({
      client: "mysql2",
      connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "pharma_dz",
      },
    }),
};
