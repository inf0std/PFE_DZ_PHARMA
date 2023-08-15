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

const pharmaRouter = express.Router();

// Route: Create a new pharmacy
pharmaRouter.post("/create/:userId", async (req, res) => {
  try {
    const id_owner = req.params.userId;
    const { name, latitude, longitude, phone } = req.body;
    const newPharmacy = { id_owner, name, latitude, longitude, phone };

    // Insert the new pharmacy record and get its ID
    const [insertedPharmacyId] = await knex("pharmacie").insert(newPharmacy);

    // Update the user's idpharmacie field with the inserted pharmacy ID
    await knex("users")
      .where("user_id", id_owner)
      .update({ idpharmacie: insertedPharmacyId });

    res.json({ id: insertedPharmacyId, ...newPharmacy });
  } catch (error) {
    console.error("Error creating pharmacy:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: List all pharmacies
pharmaRouter.get("/list", async (req, res) => {
  try {
    const pharmacies = await knex("pharmacie").select("*");
    res.json(pharmacies);
  } catch (error) {
    console.error("Error fetching pharmacies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: Get a specific pharmacy by ID
pharmaRouter.get("/list/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacy = await knex("pharmacie").where("pharmacie_id", id).first();

    if (!pharmacy) {
      return res.status(404).json({ error: "Pharmacy not found" });
    }

    res.json(pharmacy);
  } catch (error) {
    console.error("Error fetching pharmacy:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: Edit a pharmacy
pharmaRouter.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { id_owner, name, latitude, longitude, phone } = req.body;
    const updatedPharmacy = { id_owner, name, latitude, longitude, phone };

    await knex("pharmacie").where("pharmacie_id", id).update(updatedPharmacy);
    res.json({ id, ...updatedPharmacy });
  } catch (error) {
    console.error("Error editing pharmacy:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: Delete a pharmacy
pharmaRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    // Get the idpharmacie from the pharmacy being deleted
    const deletedPharmacy = await knex("pharmacie")
      .where("pharmacie_id", id)
      .first();
    const deletedPharmacyId = deletedPharmacy
      ? deletedPharmacy.pharmacie_id
      : null;

    // Update the idpharmacie field in the users table
    await knex("users")
      .where("idpharmacie", deletedPharmacyId)
      .update({ idpharmacie: null });

    // Delete the pharmacy
    await knex("pharmacie").where("pharmacie_id", id).del();

    res.json({ message: "Pharmacy deleted successfully" });
  } catch (error) {
    console.error("Error deleting pharmacy:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = pharmaRouter;
