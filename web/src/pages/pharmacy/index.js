import {
  Button,
  Modal,
  Stack,
  Form,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import { GeoAltFill } from "react-bootstrap-icons";

const PharmacyDetailsModal = ({ close, data, notify }) => {
  return (
    <Modal show size="md">
      <Modal.Header>
        <Modal.Title>
          Details de la pharmacie
          <Button className="btn-close" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={1}>
            <FloatingLabel controlId="1" label="Nom">
              <Form.Control type="text" />
            </FloatingLabel>
            <FloatingLabel controlId="1" label="Propriétaire">
              <Form.Control type="text" />
            </FloatingLabel>
            <FloatingLabel controlId="1" label="Telephone">
              <Form.Control type="text" />
            </FloatingLabel>
            <InputGroup>
              <InputGroup.Text>
                <GeoAltFill />
              </InputGroup.Text>
              <Form.Control type="text" />
              <Form.Control type="text" />
            </InputGroup>
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={1}>
          <div className="ms-auto" />
          <Button variant="outline-secondary">Fermer</Button>
          <Button variant="outline-danger">Supprimer</Button>
          <Button variant="outline-success">Confirmer</Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
};

export default PharmacyDetailsModal;
