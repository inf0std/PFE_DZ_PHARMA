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
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { control, register, getValues, handleSubmit } = useForm();
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
                    <InputGroup>
                      <InputGroup.Text>@</InputGroup.Text>
                      <Form.Control type="text" {...register("email")} />
                    </InputGroup>

                    <InputGroup>
                      <InputGroup.Text>
                        <KeyFill />
                      </InputGroup.Text>
                      <Form.Control type="password" {...register("password")} />
                    </InputGroup>
                    <Stack gap={2}>
                      <Button variant="outline-success">Se Connecter</Button>
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
