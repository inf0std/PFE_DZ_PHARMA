import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, ModalDialog } from "react-bootstrap";
import { useForm } from "react-hook-form";

const UsersPage = (props) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [register, setRegister] = useState(false);
  const { register: registerUser, getValues: userValues } = useForm();
  const { register: registerPharma, getValues: pharmaValues } = useForm();
  return (
    <>
      <Button
        onClick={() => {
          setShow(!show);
        }}
      >
        Ajouter Pharmacie
      </Button>
      {!user && !register && (
        <Modal size="sm" show={true} onHide={() => {}} backdrop="static">
          <Modal.Dialog size="xl">
            <Modal.Header>
              <Modal.Title>CONNEXION</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.FloatingLabel
                        controlId="username"
                        label="Nom d'utilisateur"
                      >
                        <Form.Control
                          type="text"
                          {...registerUser("username")}
                        />
                      </Form.FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.FloatingLabel
                        controlId="password"
                        label="Mot de passe"
                      >
                        <Form.Control
                          type="password"
                          {...registerUser("password")}
                        />
                      </Form.FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <span>
                <a
                  onClick={() => {
                    setRegister(true);
                  }}
                >
                  Sinscrire
                </a>
              </span>

              <Button
                variant="outline-primary"
                onClick={() => {
                  fetch("http://127.0.0.1:8080/user", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...userValues() }),
                  });
                }}
              >
                Se connecter
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      )}
      {register && (
        <Modal>
          {fetch("http://127.0.0.1:8080/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: "admin", password: "abcdefghij" }),
          }).then((res) => {
            console.log(res);
            setRegister(false);
          })}
        </Modal>
      )}
      {show && (
        <Modal size="lg" show={true} onHide={() => {}} backdrop="static">
          <Modal.Dialog size="xl">
            <Modal.Header>
              <Modal.Title>NOUVELLE PHARMACIE</Modal.Title>
              <Button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShow(!show);
                }}
                aria-label="Close"
              />
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.FloatingLabel controlId="name" label="nom">
                        <Form.Control type="text" {...registerPharma("name")} />
                      </Form.FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.FloatingLabel controlId="adress" label="Adresse">
                        <Form.Control
                          type="text"
                          {...registerPharma("adress")}
                        />
                      </Form.FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.FloatingLabel
                        controlId="coordinates"
                        label="Coordonnees"
                      >
                        <Form.Control
                          type="text"
                          {...registerPharma("coordinates")}
                        />
                      </Form.FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setShow(!show);
                }}
              >
                Annuler
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => {
                  console.log(pharmaValues);
                  fetch("http://127.0.0.1:8080/api/v1/pharmacies", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...pharmaValues() }),
                  });
                }}
              >
                Confirmer
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      )}
    </>
  );
};

export default UsersPage;
