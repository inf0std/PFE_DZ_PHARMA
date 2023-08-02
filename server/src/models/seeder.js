require("dotenv").config();
const faker = require("@faker-js/faker");
const db = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "",
    database: "knex-test",
  },
});

const createRandomUser = () => {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
};

const users = faker.helpers.multiple(createRandomUser, { count: 100 });
