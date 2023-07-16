import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const DashNavbar = () => {
  return (
    <Navbar expand="md">
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
      </Container>
    </Navbar>
  );
};
