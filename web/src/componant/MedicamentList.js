import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import axios from "axios";

const MedicamentList = () => {
  const [medicaments, setMedicaments] = useState([]);

  useEffect(() => {
    // Fetch medicament data using Axios
    axios
      .get("http://localhost:8080/lists/medicaments")
      .then((response) => {
        setMedicaments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicaments:", error);
      });
  }, []);

  const handleConfirm = (pharmacieId) => {
    // Here you can implement the logic to handle the confirmation
    // For example, you might update the status of the pharmacy as confirmed.
    // You can update the state or make an API call to update the backend data.
    // Remember to update the 'pharmacies' state accordingly.
    console.log(`Confirmed pharmacy with ID: ${pharmacieId}`);
  };

  const handleDelete = (pharmacieId) => {
    // Here you can implement the logic to handle the deletion
    // You might want to show a confirmation modal before actually deleting.
    // You can update the state or make an API call to delete the pharmacy.
    // Remember to update the 'pharmacies' state accordingly.
    console.log(`Deleted pharmacy with ID: ${pharmacieId}`);
  };

  return (
    <Container>
      <h1>Medicament List</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Action</th>
            <th>Num Enregistrement</th>
            <th>Code</th>
            <th>Denomination Commune Internationale</th>
            <th>Nom de Marque</th>
            <th>Forme</th>
            <th>Dosage</th>
            <th>Cond</th>
            <th>Liste</th>
            <th>P1</th>
            <th>P2</th>
            <th>Obs</th>
            <th>Laboratoires</th>
            <th>Pays du Laboratoire</th>
            <th>Date d'Enregistrement Initial</th>
            <th>Date d'Enregistrement Final</th>
            <th>Type</th>
            <th>Statut</th>
            <th>Duree de Stabilite</th>
            <th>Prix Porte</th>
            <th>Remboursement</th>
            <th>Reserve</th>
          </tr>
        </thead>
        <tbody>
          {medicaments.map((medicament) => (
            <tr key={medicament.id}>
              <td>{medicament.id}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleConfirm(medicament.id)}>
                  Confirmer
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(medicament.id)}>
                  supprimer
                </Button>
              </td>
              <td>{medicament.num_enregistrement}</td>
              <td>{medicament.code}</td>
              <td>{medicament.denomination_commune_internationale}</td>
              <td>{medicament.nom_de_marque}</td>
              <td>{medicament.forme}</td>
              <td>{medicament.dosage}</td>
              <td>{medicament.cond}</td>
              <td>{medicament.liste}</td>
              <td>{medicament.p1}</td>
              <td>{medicament.p2}</td>
              <td>{medicament.obs}</td>
              <td>
                {
                  medicament.laboratoires_detenteur_de_la_decision_d_enregistrement
                }
              </td>
              <td>
                {
                  medicament.pays_du_laboratoire_detenteur_de_la_decision_d_enregistrement
                }
              </td>
              <td>{medicament.date_d_enregistrement_initial}</td>
              <td>{medicament.date_d_enregistrement_final}</td>
              <td>{medicament.type}</td>
              <td>{medicament.statut}</td>
              <td>{medicament.duree_de_stabilite}</td>
              <td>{medicament.prix_porte_sur_la_decision_d_enregistrement}</td>
              <td>{medicament.remboursement}</td>
              <td>{medicament.reserve}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MedicamentList;
