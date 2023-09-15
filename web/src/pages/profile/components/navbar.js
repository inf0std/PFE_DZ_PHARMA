import {
  Container,
  Nav,
  Navbar,
  Row,
  Col,
  Button,
  Stack,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

import Clock from "../../../componant/clock"; //"../../componant/clock";
import { BoxArrowRight } from "react-bootstrap-icons";
//import "./navbar.css";
const ProfileNavbar = () => {
  return (
    <>
      <Navbar expand="md" bg="dark" data-bs-theme="dark" className="m-0">
        <Container fluid>
          <Navbar.Brand href="/dashboard">DZ-PHARMA</Navbar.Brand>
          <Navbar.Toggle aria-controls="nav" />
          <Stack direction="horizontal" gap={2}>
            <Button variant="outline-light">
              Se Deconnecter &nbsp;
              <BoxArrowRight size={26} />
            </Button>
            <Clock />
          </Stack>
        </Container>
      </Navbar>
    </>
  );
};

export default ProfileNavbar;
