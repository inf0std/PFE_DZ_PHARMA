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

const userRouter = express.Router();
const staticMedicaments = [
  {
    num_enregistrement: "12345",
    code: "ABC123",
    denomination_commune_internationale: "Paracetamol",
    nom_de_marque: "Panadol",
    forme: "Tablet",
    dosage: "500mg",
    cond: "Fever",
    liste: "List A",
    p1: "P1 value",
    p2: "P2 value",
    obs: "Observations",
    laboratoires_detenteur_de_la_decision_d_enregistrement: "Lab A",
    pays_du_laboratoire_detenteur_de_la_decision_d_enregistrement: "Country A",
    date_d_enregistrement_initial: "2023-08-15",
    date_d_enregistrement_final: "2023-08-31",
    type: "Type A",
    statut: "Status A",
    duree_de_stabilite: "Stability duration",
    prix_porte_sur_la_decision_d_enregistrement: "Price info",
    remboursement: "Yes",
    reserve: "Reserved",
  },
  // Add more real-like data...
  {
    num_enregistrement: "67890",
    code: "XYZ789",
    denomination_commune_internationale: "Ibuprofen",
    nom_de_marque: "Advil",
    forme: "Tablet",
    dosage: "200mg",
    cond: "Pain relief",
    liste: "List B",
    p1: "P1 value",
    p2: "P2 value",
    obs: "Observations",
    laboratoires_detenteur_de_la_decision_d_enregistrement: "Lab B",
    pays_du_laboratoire_detenteur_de_la_decision_d_enregistrement: "Country B",
    date_d_enregistrement_initial: "2023-09-01",
    date_d_enregistrement_final: "2023-09-15",
    type: "Type B",
    statut: "Status B",
    duree_de_stabilite: "Stability duration",
    prix_porte_sur_la_decision_d_enregistrement: "Price info",
    remboursement: "No",
    reserve: "Not reserved",
  },
  // Add more real-like data...
];
async function insertStaticMedicaments() {
  try {
    for (const medicament of staticMedicaments) {
      // Insert the medicament into the database
      await knex("medicament").insert({
        num_enregistrement: medicament.num_enregistrement,
        code: medicament.code,
        denomination_commune_internationale: medicament.denomination_commune_internationale,
        nom_de_marque: medicament.nom_de_marque,
        forme: medicament.forme,
        dosage: medicament.dosage,
        // ... other fields
      });
    }
    console.log("Static medicaments inserted successfully.");
  } catch (error) {
    console.error("Error inserting static medicaments:", error);
  }
}




userRouter.post("/SignUp", async (req, res) => {
  const { username, email, password } = req.body;

  console.log(email);
  // Validate incoming data (you can use a validation library like Joi here)

  try {
    // Check if the user with the same email already exists
    const existingUser = await knex("users").where("email", email).first();
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await knex("users").insert({
      username,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.post("/SignIn", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Check if the user with the given email exists
    const existingUser = await knex("users").where("email", email).first();
    if (!existingUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "User logged in successfully", user: existingUser });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
userRouter.get("/user", async (req, res) => {
  try {
    // Fetch user information from the database using req.user.userId
    console.log(req.query.userId);
    const user = await knex("users")
      .where("user_id", req.query.userId)
      .where("isarchived", false)
      .first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.get("/userslist", async (req, res) => {
  try {
    // Fetch users from the database who are not archived
    const notArchivedUsers = await knex("users")
      .where("isarchived", false)
      .select("*");

    res.json(notArchivedUsers);
  } catch (error) {
    console.error("Error fetching not archived users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userRouter.put("/users/edit/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { username, email, password, is_admin, idpharmacie, isarchived } =
    req.body;

  try {
    // Check if the user with the given userId exists
    const existingUser = await knex("users").where("user_id", userId).first();
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prepare the updated user data
    const updatedUserData = {};
    if (username) updatedUserData.username = username;
    if (email) updatedUserData.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUserData.password = hashedPassword;
    }
    if (typeof is_admin !== "undefined") updatedUserData.is_admin = is_admin;
    if (idpharmacie) updatedUserData.idpharmacie = idpharmacie;
    if (typeof isarchived !== "undefined")
      updatedUserData.isarchived = isarchived;

    // Update the user in the database
    await knex("users").where("user_id", userId).update(updatedUserData);

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
userRouter.post("/logout", (req, res) => {
  // Perform any necessary actions to log out the user (e.g., clearing session, token, etc.)
  // In this simple example, we can just return a success message
  res.json({ message: "User logged out successfully" });
});

module.exports = userRouter;
