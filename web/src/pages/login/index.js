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

const LoginPage = () => {
  const { control, register, getValues, handleSubmit } = useForm();
  return (
    <Container>
      <Row
        className="align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Col md={4}>
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
                  </Stack>
                </Form>
                <br />
                <Stack gap={2}>
                  <Button variant="outline-success">Se Connecter</Button>
                  <Button variant="link">mot de passe oublier?</Button>
                </Stack>
              </Card.Body>
            </Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
