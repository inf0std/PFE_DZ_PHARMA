import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Dropdown, Navbar, Nav, Button } from "react-bootstrap";
import "../bootstrap/css/bootstrap.min.css";

const MyNav = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const disconnectUser = async () => {
    // Clear the user session data
    await sessionStorage.removeItem("userId");

    // Redirect to the desired page after disconnection
    navigate("/"); // Redirect to the homepage or any other desired page
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    fetchUserInformation(userId);
  }, []);

  const handleDevenirPharmacien = () => {
    navigate("/pharma");
  };

  const fetchUserInformation = (userId) => {
    fetch(`http://localhost:8080/user?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Navbar</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto">
          <Nav.Link href="#" active>
            Home
          </Nav.Link>
          <Nav.Link href="#">Link</Nav.Link>

          <Nav.Link disabled>Disabled</Nav.Link>
        </Nav>
        {userData ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "15px",
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "200px",
              }}>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  as={Nav.Link}
                  id="dropdown-basic"></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={disconnectUser}>
                    Se deconnecter
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  fontSize: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "-10px",
                }}>
                {userData.username.slice(0, 2)}
              </div>
              {userData.idpharmacie ? (
                <Badge pill bg="info">
                  Ph
                </Badge>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <Button className="btn btn-outline-success" type="submit">
              Se connecter
            </Button>
            <Button className="btn btn-outline-success" type="submit">
              S'inscrire
            </Button>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNav;
