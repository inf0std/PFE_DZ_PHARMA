import React from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Card,
  Form,
  FloatingLabel,
  InputGroup,
  Stack,
  Row,
  Col,
  Button,
  ToastContainer,
} from "react-bootstrap";
import { Calendar, KeyFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { signup } from "../../service/auth";
import { useNavigate } from "react-router";

const SignupPage = ({ notify }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    getValues,
    register,
    setValue,
    formState: { isDIrty, errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });
  const submit = (values) => {
    dispatch(signup(values))
      .unwrap()
      .then((result) => {
        console.log(result);
        notify({ type: "success", message: "inscription réussie" });
        navigate("/");
      })
      .catch((e) => {
        console.log(e);

        notify({
          type: "error",
          message:
            "inscription échouée, une erreur s'est produite lors de l'inscritpion",
        });
      });
  };
  return (
    <>
      <Container fluid>
        <ToastContainer position="top-end"></ToastContainer>
        <Row
          className="align-items-center justify-content-center"
          style={{ height: "100vh" }}>
          <Col md={5}>
            <Card className="border-0 shadow">
              <Card.Header className="bg-success text-light">
                <Card.Title className="text-center">Inscription</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form noValidate className="p-4">
                  <Stack gap={2}>
                    {" "}
                    <Form.Group>
                      <InputGroup>
                        <InputGroup.Text>Nom d'utilisateur</InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="nom d'utilisateur"
                          {...register("username", {
                            required: {
                              value: true,
                              message: "obligatoire*",
                            },

                            minLength: {
                              value: 3,
                              message: "minimum 3 lettres",
                            },
                            maxLength: {
                              value: 30,
                              message: "maximum 30 lettres",
                            },
                          })}
                        />
                      </InputGroup>

                      <span className="text-danger">
                        {errors?.username?.message}
                      </span>
                    </Form.Group>
                    <Form.Group>
                      <InputGroup>
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="email@exemple.com"
                          {...register("email", {
                            required: { value: true, message: "obligatoire*" },
                            pattern: {
                              value:
                                /^[0-9a-zA-Z._-]+@[0-9a-zA-Z.]+.[0-9a-zA-Z]$/,
                              message: "mauvais format",
                            },
                          })}
                        />
                      </InputGroup>
                      <span className="text-danger">
                        {errors?.email?.message}
                      </span>
                    </Form.Group>
                    <Form.Group>
                      <InputGroup>
                        <InputGroup.Text>
                          <KeyFill />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="mot de passe"
                          {...register("password", {
                            required: { value: true, message: "obligatoire*" },
                            minLength: {
                              value: 8,
                              message: "longeur minale 8*",
                            },
                            /*  pattern: {
                              value:
                                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                              message:
                                "doit avoire: 1 caracter speciale, 1 majuscule, 1 minuscule et 1 chiffre*",
                            }, */
                          })}
                        />
                      </InputGroup>
                      <span className="text-danger">
                        {errors?.password?.message}
                      </span>
                    </Form.Group>
                    <Form.Group>
                      {" "}
                      <InputGroup>
                        <InputGroup.Text>
                          <KeyFill />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="re-ecrire le mot de passe"
                          {...register("password2", {
                            required: { value: true, message: "obligatoire*" },
                            minLength: {
                              value: 8,
                              message: "longeur minale 8*",
                            },
                            /* pattern: {
                              value:
                                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                              message:
                                "doit avoire: 1 caracter speciale, 1 majuscule, 1 minuscule et 1 chiffre*",
                            }, */
                            validate: (value) => {
                              return value === getValues().password
                                ? true
                                : "les mots de passe ne correspondent pas*";
                            },
                          })}
                        />
                      </InputGroup>
                      <span className="text-danger">
                        {errors?.password2?.message}
                      </span>
                    </Form.Group>
                    <br />
                    <Button variant="primary" onClick={handleSubmit(submit)}>
                      S'inscrire
                    </Button>
                    <p className="text-center">
                      Vous avez dejà un compte?
                      <a
                        //variant="link"
                        className="text-link"
                        onClick={() => {
                          navigate("/");
                        }}>
                        se connecter.
                      </a>
                    </p>
                  </Stack>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupPage;
