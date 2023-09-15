const express = require("express");
const bcrypt = require("bcrypt");
const makeSearch = require("../searchEngine");
const {
  createIndexFromIDs,
  createDCIIndexFromIds,
  createPharmaDistenceIndex,
  createPharmaDistenceMatrix,
} = require("../searchEngine/queryGenerators");

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "Pharma_dz",
    //port: 3307,
  },
});

const searchRouter = express.Router();

searchRouter.post("/", makeSearch);

const test_data = [
  {
    score: 10,
    distence: 1.5,
    remboursement: 3000, //

    pharmacies: [
      {
        nom: "pharma 1",
        longitude: 2.99353495582114,
        latitude: 36.712691747354654,
      },
    ],
  },
  {
    score: 9.5,
    distence: 1.6,
    remboursement: 2000,
    pharmacies: [
      {
        nom: "pharma 2a",
        longitude: 1.99353495582114,
        latitude: 36.712691747354654,
      },
      {
        nom: "pharma 2b",
        longitude: 1.0353495582114,
        latitude: 36.712691747354654,
      },
    ],
  },
  {
    score: 9.3,
    distence: 1.5,
    remboursement: 1000,
    pharmacies: [
      {
        nom: "pharma 3a",
        longitude: 0.99353495582114,
        latitude: 36.712691747354654,
      },
      {
        nom: "pharma 3b",
        longitude: 0.99353495582114,
        latitude: 36.712691747354654,
      },
      {
        nom: "pharma 3c",
        longitude: 0.99353495582114,
        latitude: 36.712691747354654,
      },
    ],
  },
];

module.exports = searchRouter;
