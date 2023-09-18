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
import { useGetStockQuery } from "../../service/api/medicineApi";

const ProfilePage = ({ notify }) => {
  const [vendre, setVendre] = useState(false);
  const [stocker, setStocker] = useState(false);
  const [create, setCreate] = useState(false);
  const auth = useSelector((state) => state.persistedReducer.auth);
  const {
    data: stock,
    isLoading,
    error,
    refetch,
  } = useGetStockQuery({ id: auth?.value?.pharmacie.pharmacie_id });
  console.log(auth);
  const parseStock = (data) => {
    return data.map((o) => ({
      "Nom de marque": o.nom_de_marque,
      Quantite: o.quantity,
      Expiration: o.expiration.substring(0, 10),
    }));
  };
  return (
    <Container fluid>
      <ProfileNavbar />
      <Row>
        {create && (
          <CreatePharmacyModal close={() => setCreate(false)} notify={notify} />
        )}
        {stocker && (
          <AddStockModal
            close={() => setStocker(false)}
            notify={notify}
            refetch={refetch}
          />
        )}
        {vendre && (
          <MakeSaleModal close={() => setVendre(false)} notify={notify} />
        )}
        <Col md={3} className="mt-3 mx-1">
          <Form>
            <div className="fieldset shadow">
              <strong className="legend">Details Personnels:</strong>
              <Stack gap={2}>
                <FloatingLabel controlId="1" label="Prenom">
                  <Form.Control
                    type="text"
                    value={auth?.value?.username}
                    readOnly
                  />
                </FloatingLabel>
                <FloatingLabel controlId="1" label="email">
                  <Form.Control type="text" value={auth.value.email} />
                </FloatingLabel>
              </Stack>
            </div>

            {auth?.value?.pharmacie && (
              <div className="fieldset mt-3 shadow">
                <strong className="legend">Details Pharmacie:</strong>
                <Stack gap={2}>
                  <FloatingLabel controlId="1" label="Nom">
                    <Form.Control
                      type="text"
                      value={auth.value.pharmacie.name}
                      readOnly
                    />
                  </FloatingLabel>
                  <InputGroup>
                    <InputGroup.Text>
                      <GeoAltFill />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={auth.value.pharmacie.latitude}
                      readOnly
                    />
                    <Form.Control
                      type="text"
                      value={auth.value.pharmacie.longitude}
                      readOnly
                    />
                  </InputGroup>
                </Stack>
              </div>
            )}
          </Form>
        </Col>

        {!auth?.value?.pharmacie && (
          <Col className="align-items-center fieldset shadow">
            <div className="align-self-center">
              <Button variant="outline-success" onClick={() => setCreate(true)}>
                Creer Pharmacie
              </Button>
            </div>
          </Col>
        )}

        {auth?.value?.pharmacie && (
          <Col md={8}>
            <Stack className="mt-2" direction="horizontal" gap={2}>
              <div className="ms-auto" />

              <Button
                variant="outline-success"
                onClick={() => setStocker(true)}>
                Ajouter stock &nbsp; <PlusCircle />
              </Button>
              <Button variant="outline-success" onClick={() => setVendre(true)}>
                Effectuer une vente
              </Button>
            </Stack>
            <hr />
            {stock && (
              <Row>
                <DataTable
                  data={parseStock(stock)}
                  rowSpanFn={() => 1}
                  clickFn={console.log}
                />
              </Row>
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProfilePage;
