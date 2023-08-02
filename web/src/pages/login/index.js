import { KeyFill } from "react-bootstrap-icons";
import {
  Card,
  Col,
  InputGroup,
  Row,
  Form,
  Stack,
  Button,
  Container,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../service/auth";
import { useDispatch } from "react-redux";
const LoginPage = ({ notify }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm();

  const submit = (values) => {
    dispatch(login(values))
      .unwrap()
      .then((result) => {
        console.log(result);
        return notify({ type: "success", message: "Connexion reussie" });
      })
      .catch((e) => {
        console.log(e);
        if (e?.code && e?.code >= 500)
          return notify({
            type: "error",
            message:
              "une erreur c'est produite lors de la connexion \n veuillez rééssayer plustard",
          });
        if (e?.status && e?.status == 401)
          return notify({
            type: "error",
            message: "COnnexion echouée, Email et/ou mot de passe non valide",
          });
        notify({
          type: "error",
          message:
            "Connexion échouée, impossible d'établir la liaison avec le serveur, veuillez verifier votre connexion internet",
        });
      });
  };
  return (
    <Container fluid>
      <Row
        className="align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Col md={5}>
          <Card className="border-0 shadow">
            <Card.Header>
              <Card.Title className="text-center">
                <h1>Connexion</h1>
              </Card.Title>
              <Card.Body className="py-5 px-5">
                <Form>
                  <Stack gap={2}>
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
                          {...register("password", {
                            required: { value: true, message: "obligatoire*" },
                            minLength: {
                              value: 8,
                              message: "longeur minale 8*",
                            },
                            pattern: {
                              value:
                                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                              message:
                                "doit avoire: 1 caracter speciale, 1 majuscule, 1 minuscule et 1 chiffre*",
                            },
                          })}
                        />
                      </InputGroup>
                      <span className="text-danger">
                        {errors?.password?.message}
                      </span>
                    </Form.Group>

                    <Stack gap={2}>
                      <Button
                        variant="outline-success"
                        onClick={handleSubmit(submit)}
                      >
                        Se Connecter
                      </Button>
                      <p className="text-center w-100">
                        <strong>Vous n'avez pas encore de compte? </strong>
                        <Link to={"/signup"} className="text-success">
                          s'inscrire?
                        </Link>
                      </p>

                      <Button variant="link">mot de passe oublier?</Button>
                    </Stack>
                  </Stack>
                </Form>
              </Card.Body>
            </Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
