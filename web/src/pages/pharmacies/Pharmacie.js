import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Pharma.css"; // Import the CSS file for styling
import axios from "axios"; // Import Axios
const Pharma = ({ close, notify, data }) => {
  const [idconneted, setIdConnected] = useState("");
  useEffect(() => {
    // Get the user ID from session storage
    const userId = sessionStorage.getItem("userId");
    setIdConnected(userId);
  }, []);

  const [formValues, setFormValues] = useState({
    id_owner: "",
    name: "",
    latitude: "",
    longitude: "",
    phone: "",
  });
  const [pharmacies, setPharmacies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { lat, lng } = location.state || {};

  ////////////////////

  const [latValue, setLatValue] = useState(lat || "");
  const [lngValue, setLngValue] = useState(lng || "");

  useEffect(() => {
    setLatValue(lat || "");
    setLngValue(lng || "");
  }, [lat, lng]);
  /////////////////////////////////////////////
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/create/" + idconneted,
        {
          name: formValues.name,
          latitude: latValue,
          longitude: lngValue,
          phone: formValues.phone,
        }
      );

      // Handle success, e.g., display a success message or navigate to another page
      console.log("Pharmacie added:", response.data);
      alert("pharma added");
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error("Error adding pharmacy:", error);
    }
  };

  const handleMapIconClick = () => {
    navigate("/Map");
  };

  return (
    <div className="pharma-container">
      <h2>Pharmacie Form</h2>
      <Form onSubmit={handleSubmit} className="pharma-form">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Latitude</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              type="number"
              name="latitude"
              value={latValue}
              onChange={(e) => setLatValue(e.target.value)}
              required
            />
            <FaMapMarkerAlt
              className="ml-2 map-icon"
              onClick={handleMapIconClick}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Longitude</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              type="number"
              name="longitude"
              value={lngValue}
              onChange={(e) => setLngValue(e.target.value)}
              required
            />
            <FaMapMarkerAlt
              className="ml-2 map-icon"
              onClick={handleMapIconClick}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit">Add Pharmacie</Button>
      </Form>
    </div>
  );
};

export default Pharma;
