import { DivIcon } from "leaflet";
import { useState, useEffect } from "react";
import {
  Form,
  Modal,
  Button,
  Stack,
  InputGroup,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import { CapsulePill, PlusCircle, PlusCircleFill } from "react-bootstrap-icons";
import {
  useAddSaleMutation,
  useFetchMedicinesQuery,
} from "../../../service/api/medicineApi";
/* 
const meds = [
  { ID: 1, NOM_DE_MARQUE: "PARACITAMOL" },
  { ID: 2, NOM_DE_MARQUE: "PARA" },
  { ID: 3, NOM_DE_MARQUE: "PARA" },
  { ID: 4, NOM_DE_MARQUE: "PARA" },
  { ID: 5, NOM_DE_MARQUE: "PARA" },
]; */
const MakeSaleModal = ({ close, notify }) => {
  const [medId, setMedId] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [barCode, setBarCode] = useState("");
  const [choose, setChoose] = useState(false);
  const [meds, setMeds] = useState([]);
  const { data: medList, isLoading, error } = useFetchMedicinesQuery();
  const [addSale, { isLoading: fetching, isSuccess, isError, data }] =
    useAddSaleMutation();

  const handleClose = () => {
    close && close();
  };
  const handleDigitClick = (value) => () => {
    setQuantity((quantity) => quantity * 10 + value);
  };

  const handleResetQuantity = () => {
    setQuantity(0);
  };

  const handleRevertQuantity = () => {
    setQuantity((quantity) => Math.floor(quantity / 10));
  };

  const removeMed = (index) => {
    setMeds((meds) => meds.filter((_, i) => i != index));
  };

  const addMed = (med) => {
    //setMeds(meds=>[...meds, ])
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.length === 1) {
        setBarCode((barCode) => barCode + e.key);
      } else if (e.key.toUpperCase() === "ENTER") {
        setChoose(true);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    /* if (choose) {
       let med = meds.filter((med) => med.BAR_CODE == barCode.value)?.[0];
       if (med) {
         setMedId(med.ID);
         setBarCode({
           value: "",
         });
       }
       setChoose(false);
     } */
  }, [choose]);
  return (
    <Modal size="lg" show>
      <Modal.Header>
        <Modal.Title>Vente:</Modal.Title>
        <Button className="btn-close" onClick={handleClose}></Button>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="fieldset me-1 shadow">
            <Stack gap={2}>
              <InputGroup style={{ width: "100%" }}>
                <InputGroup.Text>
                  <CapsulePill size={20} />
                </InputGroup.Text>
                <Form.Select
                  value={medId}
                  onChange={(e) => setMedId((medId) => e.target.value)}>
                  {meds.map((med, index) => (
                    <option key={index} value={med.ID}>
                      {med.NOM_DE_MARQUE}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control
                  //hidden
                  type="number"
                  placeholder=""
                  readOnly
                  value={quantity}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>EXP:</InputGroup.Text>
                <Form.Control type="date" />
              </InputGroup>

              <Form.Control
                type="text"
                value={barCode.value}
                //onChange={() => {}}
                readOnly
                //hidden
              />
            </Stack>
            <Row
              className="mt-1 mb-2"
              style={{ width: "100%", margin: "auto" }}>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px", borderTopLeftRadius: "5px" }}
                onClick={handleDigitClick(1)}>
                1
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(2)}>
                2
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px", borderTopRightRadius: "5px" }}
                onClick={handleDigitClick(3)}>
                3
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(4)}>
                4
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(5)}>
                5
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(6)}>
                6
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(7)}>
                7
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(8)}>
                8
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(9)}>
                9
              </Button>
              <Button
                className="col-md-4"
                variant="secondary"
                onClick={handleResetQuantity}
                style={{ borderRadius: "0px", borderBottomLeftRadius: "5px" }}
                disabled={!(quantity > 0)}>
                C
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{
                  borderRadius: "0px",
                }}
                onClick={handleDigitClick(0)}>
                0
              </Button>
              <Button
                className="col-md-4"
                variant="secondary"
                style={{ borderRadius: "0px", borderBottomRightRadius: "5px" }}
                onClick={handleRevertQuantity}
                disabled={!(quantity > 0)}>
                {"<<"}
              </Button>
            </Row>

            <Button variant="success">
              Ajouter &nbsp;
              <PlusCircle />
            </Button>
          </Col>
          <Col className="fieldset shadow">
            <ListGroup>
              {meds?.map((med, index) => (
                <ListGroupItem className="shadow my-1" key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <span>{med?.med?.NOM_DE_MARQUE ?? "PARACITAMOL"}</span>
                    <span>{med?.quantity ?? 1}</span>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={2}>
          <div className="ms-auto" />
          <Button variant="outline-secondary">Fermer</Button>
          <Button
            variant="outline-success"
            disabled={meds.length == 0} //onClick={handleAddStock}
          >
            Vendre
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
};

export default MakeSaleModal;
