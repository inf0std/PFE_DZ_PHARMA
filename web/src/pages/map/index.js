import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Alert, Button } from "react-bootstrap";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const Map = () => {
  const [position, setPosition] = useState({ lat: 36.588787, lng: 3.773203 }); // Initialize with specific coordinates

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return null;
  };
  const handleChooseClick = () => {
    if (position) {
      navigate("/Pharma", { state: { lat: position.lat, lng: position.lng } });
    }
  };
  return (
    <div>
      <MapContainer
        center={[position.lat, position.lng]} // Use the position state for initial center
        zoom={17}
        style={{ height: "50vh", width: "100vw" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        {position && <Marker position={position} />}
      </MapContainer>

      {position && (
        <div>
          <Alert variant="success">
            Latitude: {position.lat.toFixed(6)}, Longitude:{" "}
            {position.lng.toFixed(6)}
          </Alert>
          <Button variant="primary" onClick={handleChooseClick}>
            Choose
          </Button>
        </div>
      )}
    </div>
  );
};

export default Map;
