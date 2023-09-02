import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Modal,
  Button,
  Row,
  Col,
  Form,
  Stack,
} from "react-bootstrap";
import Select from "react-select";
import { CapsulePill } from "react-bootstrap-icons";

import { BAR_CODE_SIZE } from "../../../constants";
const meds = [
  {
    ID: 1,
    CODE: "103 0F 345",
    NOM_DE_MARQUE: "paracetamol",
    BAR_CODE: "23456787",
  },
  {
    ID: 2,
    CODE: "103 0F 345",
    NOM_DE_MARQUE: "dolic",
    BAR_CODE: "23456786",
  },
  {
    ID: 3,
    CODE: "103 0F 344",
    NOM_DE_MARQUE: "xcedol",
    BAR_CODE: "23456785",
  },
  {
    ID: 4,
    CODE: "103 0F 343",
    NOM_DE_MARQUE: "augmentin",
    BAR_CODE: "23456784", //
  },
];

const AddStockModal = ({ close, notify }) => {
  const [barCode, setBarCode] = useState({ value: "" });
  const [quantity, setQuantity] = useState(0);
  const [medId, setMedId] = useState(null);
  const [choose, setChoose] = useState(false);

  const handleDigitClick = (value) => () => {
    setQuantity((quantity) => quantity * 10 + value);
  };

  const handleResetQuantity = () => {
    setQuantity(0);
  };

  const handleRevertQuantity = () => {
    setQuantity((quantity) => Math.floor(quantity / 10));
  };
  const handleClose = () => {};
  const handleAddStock = () => {
    console.log(
      "adding stock",
      meds.filter((med) => med.ID == medId)?.[0]?.NOM_DE_MARQUE
    );
    setMedId(null);
    handleResetQuantity();
    setBarCode({ value: "" });
  };
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.length === 1) {
        setBarCode((barCode) => ({ value: barCode.value + e.key }));
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
    console.log("changed", barCode);
  }, [barCode]);
  useEffect(() => {
    console.log("id", medId);
  }, [medId]);

  useEffect(() => {
    if (choose) {
      let med = meds.filter((med) => med.BAR_CODE == barCode.value)?.[0];
      if (med) {
        setMedId(med.ID);
        setBarCode({
          value: "",
        });
      }
      setChoose(false);
    }
  }, [choose]);
  return (
    <Modal size="md" show>
      <Modal.Header>
        <Modal.Title>AJOUTER STOCK:</Modal.Title>
        <Button className="btn-close" onClick={handleClose}></Button>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="fieldset">
            <Stack gap={2}>
              <InputGroup style={{ width: "100%" }}>
                <InputGroup.Text>
                  <CapsulePill size={20} />
                </InputGroup.Text>
                <Form.Select
                  value={medId}
                  onChange={(e) => setMedId((medId) => e.target.value)}
                >
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
            <Row style={{ width: "100%", margin: "auto" }}>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px", borderTopLeftRadius: "5px" }}
                onClick={handleDigitClick(1)}
              >
                1
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(2)}
              >
                2
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px", borderTopRightRadius: "5px" }}
                onClick={handleDigitClick(3)}
              >
                3
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(4)}
              >
                4
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(5)}
              >
                5
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(6)}
              >
                6
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(7)}
              >
                7
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(8)}
              >
                8
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{ borderRadius: "0px" }}
                onClick={handleDigitClick(9)}
              >
                9
              </Button>
              <Button
                className="col-md-4"
                variant="secondary"
                onClick={handleResetQuantity}
                style={{ borderRadius: "0px", borderBottomLeftRadius: "5px" }}
                disabled={!(quantity > 0)}
              >
                C
              </Button>
              <Button
                className="col-md-4"
                variant="outline-secondary"
                style={{
                  borderRadius: "0px",
                }}
                onClick={handleDigitClick(0)}
              >
                0
              </Button>
              <Button
                className="col-md-4"
                variant="secondary"
                style={{ borderRadius: "0px", borderBottomRightRadius: "5px" }}
                onClick={handleRevertQuantity}
                disabled={!(quantity > 0)}
              >
                {"<<"}
              </Button>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={2}>
          <div className="ms-auto" />
          <Button variant="outline-secondary">Fermer</Button>
          <Button variant="outline-success" onClick={handleAddStock}>
            Ajouter Stcok
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
};
/* 
function AddStockModal() {
  const [pressedKeys, setPressedKeys] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Pressed Keys:", pressedKeys);
    } else if (event.key.length === 1) {
      setPressedKeys((prevPressedKeys) => prevPressedKeys + event.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [pressedKeys]); // Adding pressedKeys to the dependency array to prevent stale data issues

  return (
    <div>
      <p>Press keys and see them concatenated:</p>
      <div>{pressedKeys}</div>
    </div>
  );
} */

export default AddStockModal;
