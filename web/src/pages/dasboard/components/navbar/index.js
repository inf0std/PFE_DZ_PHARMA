import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

import Clock from "../../../../componant/clock";
//import "./navbar.css";
const DashNavbar = () => {
  const location = useLocation();
  return (
    <>
      <Navbar expand="md" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/dashboard">DZ-PHARMA</Navbar.Brand>
          <Navbar.Toggle aria-controls="nav" />
          <Navbar.Collapse id="nav">
            <Nav>
              <Nav.Link as={NavLink} to="/dashboard/pharmacies">
                Pharmacies
              </Nav.Link>
              <Nav.Link as={NavLink} to="/dashboard/users">
                Utilisateurs
              </Nav.Link>
              <Nav.Link as={NavLink} to="/dashboard/medicines">
                Medicaments
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Clock />
        </Container>
      </Navbar>
      <Container fluid>
        <Row className="bg-success">zqertfyguhijokl</Row>
      </Container>
    </>
  );
};

export default DashNavbar;
