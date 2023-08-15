const express = require("express");
const bcrypt = require("bcrypt");
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "Pharma_dz",
    port: 3307,
  },
});

const medRouter = express.Router();

medRouter.get("/lists/medicaments", async (req, res) => {
  try {
    const medicaments = await knex("medicament").select("*");
    res.json(medicaments);
  } catch (error) {
    console.error("Error fetching medicaments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Define a route to add stock entries
medRouter.post("/addStock", async (req, res) => {
  try {
    const pharmacie_id = req.query.pharmacie_id;
    const { medicament_id, quantity, expiration_date } = req.body;

    await knex("stock").insert({
      pharmacie_id,
      medicament_id,
      stock_date: new Date(),
      quantity,
      expiration_date,
    });

    res.json({ message: "Stock entry added successfully" });
  } catch (error) {
    console.error("Error adding stock entry:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
medRouter.get("/getStockList", async (req, res) => {
  try {
    const pharmacie_id = req.query.pharmaId;
    console.log(pharmacie_id);

    const stockList = await knex("stock")
      .select(
        "stock.*",
        "medicament.id as medicament_id",
        "medicament.nom_de_marque"
      )
      .join("medicament", "stock.medicament_id", "=", "medicament.id")
      .where("stock.pharmacie_id", pharmacie_id);

    res.json(stockList);
  } catch (error) {
    console.error("Error retrieving stock list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search route
medRouter.get("/searchMed", async (req, res) => {
  const searchText = req.query.q; // Get search query from URL query parameter

  try {
    const searchResults = await knex("medicament")
      .select("*")
      .where("denomination_commune_internationale", "LIKE", `%${searchText}%`)
      .orWhere("nom_de_marque", "LIKE", `%${searchText}%`)
      .orWhere("code", "LIKE", `%${searchText}%`);

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while searching." });
  }
});


async function getMatchingMedicationsByDCI(ordonnance) {
  try {
    const uniqueDCIs = [...new Set(ordonnance.map(item => item.denomination_commune_internationale))];

    const matchingMedications = await knex("medicament")
      .select("*")
      .whereIn("denomination_commune_internationale", uniqueDCIs);

    return matchingMedications;
  } catch (error) {
    console.error("Error retrieving medications:", error);
    throw new Error("An error occurred while retrieving medications.");
  }
}

async function testFunction() {
  try {
    const ordonnance = [
      { id: 1, denomination_commune_internationale: "Common Name " },
      { id: 2, denomination_commune_internationale: "Paracetamol" },
      // ... add more medications
    ];

    const matchingMedications = await getMatchingMedicationsByDCI(ordonnance);

    console.log("Matching Medications:", matchingMedications);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testFunction();

module.exports = medRouter;
