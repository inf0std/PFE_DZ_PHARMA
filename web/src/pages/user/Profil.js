import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, Badge, Modal, Button } from "react-bootstrap"; // Import Tab and Tabs components
import "../../bootstrap/css/bootstrap.min.css"; // Import Bootstrap CSS
import Pharma from "../pharmacies/Pharmacie";
import AddStock from "./AddStock";
import MyNav from "../../componant/Nav";
import MedicamentList from "../../componant/MedicamentList";
import UserList from "../../componant/UserList";
import PharmacyList from "../../componant/PharmacyList";
import StockTable from "../../componant/StockTable";
const Profil = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddStock pharmacieId={userData?.idpharmacie} />
        </Modal.Body>
      </Modal>
      <MyNav />
      <div
        style={{
          display: "flex",

          backgroundColor: "#f5f5f5",
        }}>
        <div
          style={{
            display: "flex",

            backgroundColor: "#f5f5f5",
          }}>
          {userData ? (
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                minWidth: "300px", // Adjust the minimum width as needed
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px",
                }}>
                <div
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    fontSize: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  {userData.username.slice(0, 2)}
                </div>
              </div>
              <h2 style={{ marginBottom: "15px" }}>User Information</h2>
              <p style={{ fontSize: "18px", margin: "5px 0" }}>
                Name: {userData.username}
              </p>
              <p style={{ fontSize: "18px", margin: "5px 0" }}>
                Email: {userData.email}
              </p>

              {!userData.is_admin ? (
                userData.idpharmacie ? (
                  <Badge pill bg="info">
                    Pharmacien
                  </Badge>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleDevenirPharmacien}
                    style={{ marginTop: "10px" }}>
                    Ajouter une Pharmacie
                  </button>
                )
              ) : (
                <Badge pill bg="dark">
                  Admin
                </Badge>
              )}
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>
        <div>
          {userData && (
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3">
              {userData.is_admin ? (
                <Tab eventKey="MedicamentList" title="MedicamentList">
                  <MedicamentList />
                </Tab>
              ) : null}
              {userData.is_admin ? (
                <Tab eventKey="Listuser" title="Listuser">
                  <UserList />
                </Tab>
              ) : null}
              {userData.is_admin ? (
                <Tab eventKey="Listpharmacies" title="Listpharmacies">
                  <PharmacyList />
                </Tab>
              ) : null}

              {!userData.is_admin ? (
                userData.idpharmacie ? (
                  <Tab eventKey="pharmacie" title="Pharmacie">
                    <Button variant="primary" onClick={handleShow}>
                      ajouter un stock
                    </Button>
                    <StockTable pharmaId={userData.idpharmacie} />
                  </Tab>
                ) : (
                  <Tab
                    eventKey="ajouter une pharmacie"
                    title="ajouter une pharmacie">
                    <Pharma />
                  </Tab>
                )
              ) : null}
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
};

export default Profil;
