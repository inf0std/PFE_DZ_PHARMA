const express = require("express");

const apiRouter = express.Router();

//pour recuperer les pharmacies
apiRouter.get("/pharmacies");

//recuperer les details d'une pharmacie
apiRouter.get("/pharmacies/:id");

//recuperer la list des medicamant dans le stock d'une pharmacie
apiRouter.get("/pharmacies/:id/medicaments");

//ajouter une pharmacie
apiRouter.post("/pharmacies");

//ajouter des medicament dans le stock de la pharmacie
apiRouter.post("/pharmacies/:id/medicaments");

//pour recuperer les medicaments
apiRouter.get("/medicaments");

//pour recuperer les details d'un medicamnet
apiRouter.get("/medicament/:id");

//ajouter un medicament vers la bdd
apiRouter.post("/medicaments");
