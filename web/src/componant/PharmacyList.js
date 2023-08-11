import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import axios from "axios";

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPharmacies();
  }, []);
  const fetchPharmacies = () => {
    // Fetch pharmacy data using Axios
    axios
      .get("http://localhost:8080/list")
      .then((response) => {
        setPharmacies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pharmacies:", error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/${id}`);
      setMessage(response.data.message);
      fetchPharmacies();
    } catch (err) {
      setError("Error deleting pharmacy");
      console.error(err);
    }
  };

  return (
    <Container>
      <h1>Pharmacy List</h1>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Owner ID</th>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Phone</th>
            <th>Action</th> {/* Added Action column */}
          </tr>
        </thead>
        <tbody>
          {pharmacies.map((pharmacy) => (
            <tr key={pharmacy.pharmacie_id}>
              <td>{pharmacy.pharmacie_id}</td>
              <td>{pharmacy.id_owner}</td>
              <td>{pharmacy.name}</td>
              <td>{pharmacy.latitude}</td>
              <td>{pharmacy.longitude}</td>
              <td>{pharmacy.phone}</td>
              <td>
                <Button variant="success">Confirmer</Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(pharmacy.pharmacie_id)}>
                  supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PharmacyList;
