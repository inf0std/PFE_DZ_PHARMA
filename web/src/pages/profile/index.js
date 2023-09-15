import React, { useState, useRef, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Modal,
  Form,
  FloatingLabel,
  InputGroup,
  Stack,
  Button,
} from "react-bootstrap";
import ProfileNavbar from "./components/navbar";
import { useSelector } from "react-redux";
import { GeoAlt, GeoAltFill, PlusCircle } from "react-bootstrap-icons";
import DataTable from "../../componant/table";
import AddStockModal from "./components/AddStockModal";
import MakeSaleModal from "./components/MakeSaleModal";
import CreatePharmacyModal from "./components/createPharmacy";

const ProfilePage = ({ notify }) => {
  const [vendre, setVendre] = useState(false);
  const [stocker, setStocker] = useState(false);
  const [create, setCreate] = useState(false);
  const { auth } = useSelector((state) => state.persistedReducer.auth);
  return (
    <Container fluid>
      <ProfileNavbar />
      <Row>
        {create && <CreatePharmacyModal close={() => setCreate(false)} />}
        {stocker && <AddStockModal close={() => setStocker(false)} />}
        {vendre && <MakeSaleModal close={() => setVendre(false)} />}
        <Col md={4} className="mt-3 mx-1">
          <Form>
            <div className="fieldset shadow">
              <strong className="legend">Details Personnels:</strong>
              <Stack gap={2}>
                <FloatingLabel controlId="1" label="Prenom">
                  <Form.Control
                    type="text"
                    value={auth?.value?.name}
                    readOnly
                  />
                </FloatingLabel>
                <FloatingLabel controlId="1" label="Nom">
                  <Form.Control type="text" />
                </FloatingLabel>
                <FloatingLabel controlId="1" label="email">
                  <Form.Control type="text" />
                </FloatingLabel>
              </Stack>
            </div>

            <div className="fieldset mt-3 shadow">
              <strong className="legend">Details Pharmacie:</strong>
              <Stack gap={2}>
                <FloatingLabel controlId="1" label="Nom">
                  <Form.Control type="text" readOnly />
                </FloatingLabel>
                <InputGroup>
                  <InputGroup.Text>
                    <GeoAltFill />
                  </InputGroup.Text>
                  <Form.Control type="text" readOnly />
                  <Form.Control type="text" readOnly />
                </InputGroup>
              </Stack>
            </div>
          </Form>
        </Col>
        {false && (
          <Col className="align-items-center fieldset shadow">
            <div className="align-self-center">
              <Button variant="outline-success" onClick={() => setCreate(true)}>
                Creer Pharmacie
              </Button>
            </div>
          </Col>
        )}

        {true && (
          <Col>
            <Stack className="mt-2" direction="horizontal" gap={2}>
              <div className="ms-auto" />

              <Button
                variant="outline-success"
                onClick={() => setStocker(true)}
              >
                Ajouter stock &nbsp; <PlusCircle />
              </Button>
              <Button variant="outline-success" onClick={() => setVendre(true)}>
                Effectuer une vente
              </Button>
            </Stack>
            <hr />
            <DataTable data={[]} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProfilePage;
