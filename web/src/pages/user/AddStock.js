import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";

function AddStock({ pharmacieId }) {
  const [medicamentOptions, setMedicamentOptions] = useState([]);
  const [selectedMedicament, setSelectedMedicament] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  useEffect(() => {
    // Fetch list of medicaments using Axios
    axios
      .get("http://localhost:8080/lists/medicaments")
      .then((response) => {
        const options = response.data.map((medicament) => ({
          value: medicament.id,
          label: medicament.nom_de_marque, // Assuming "nom_de_marque" is the medicament's name field
        }));
        setMedicamentOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching medicaments:", error);
      });
  }, []);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/addStock?pharmacie_id=${pharmacieId}`,
        {
          medicament_id: selectedMedicament.value,
          quantity: quantity,
          expiration_date: expirationDate,
        }
      );

      if (response.status === 200) {
        // Stock entry added successfully
        console.log("Stock entry added successfully");
        setSuccessMessage("Stock entry added successfully");
        setErrorMessage(""); // Clear any previous error message
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error("Error adding stock entry");
      }
    } catch (error) {
      console.error("Error adding stock entry:", error);
      setErrorMessage("Error adding stock entry: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="medicamentId">
          <Form.Label>Medicament</Form.Label>
          <Select
            options={medicamentOptions}
            value={selectedMedicament}
            onChange={(value) => setSelectedMedicament(value)}
          />
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="expirationDate">
          <Form.Label>Expiration Date</Form.Label>
          <Form.Control
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Stock
        </Button>
      </Form>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </div>
  );
}

export default AddStock;
