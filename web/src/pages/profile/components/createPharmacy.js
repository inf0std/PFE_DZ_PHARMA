import React, { useState, useEffect } from "react";
import { useCreatePharmacyMutation } from "../../../service/api/pharmacyApi";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import {
  requiredRule,
  frenchRule,
  longitudeRule,
  latitudeRule,
  phoneRule,
} from "../../../constants";

import {
  Modal,
  Button,
  Stack,
  Form,
  FloatingLabel,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";

import { useForm } from "react-hook-form";
import {
  At,
  Check2Circle,
  CheckCircleFill,
  CheckSquareFill,
  Display,
  GeoAltFill,
  GeoFill,
} from "react-bootstrap-icons";

// Generate custom icon image URL
//const customIconUrl = `data:image/svg+xml;base64,${btoa(GeoAltFill.toSvg())}`;

const customIcon = L.divIcon({
  className: "custom-icon",
});

const CreatePharmacyModal = ({ notify, close }) => {
  //36.69608953148957, 4.055817026822473
  const [position, setPosition] = useState({
    longitude: 36.69608953148957,
    latitude: 4.055817026822473,
  });
  const [showMap, setSHowMap] = useState(false);
  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      userId: "1",
      name: "",
      longitude: "",
      latitude: "",
      phone: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  console.log(getValues());
  const handleClose = () => {
    close();
  };

  //

  const handleCreate = (values) => {
    console.log(values);
  };
  useEffect(() => {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
      // Get the geolocation
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("position", position);
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setValue("latitude", position.coords.latitude);
          setValue("longitude", position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not available.");
    }
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setValue("latitude", e.latlng.lat);
        setValue("longitude", e.latlng.lng);
        setPosition({ latitude: e.latlng.lat, longitude: e.latlng.lng });
      },
    });

    return null;
  };
  return (
    <Modal size="lg" show>
      {console.log(getValues())}
      <Modal.Header className="text-center">
        <Modal.Title className="text-center">Creer Une Pharmacie:</Modal.Title>
        <Button className="btn-close" />
      </Modal.Header>
      <Modal.Body>
        <Form noValidate hidden={showMap}>
          <Form.Control type="text" {...register("userId")} hidden disabled />
          <Stack gap={2}>
            <FloatingLabel controlId="1" label="Nom">
              <Form.Control
                type="text"
                {...register("name", { ...requiredRule, ...frenchRule })}
              />
              {errors?.name && (
                <span className="text-danger">{errors?.name?.message}</span>
              )}
            </FloatingLabel>
            <div className="fieldset">
              <strong className="legend">Position:</strong>
              <Stack gap={2}>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Text>
                      <GeoAltFill size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="longitude"
                      {...register("longitude", { ...longitudeRule })}
                    />
                  </InputGroup>
                  {errors?.longitude && (
                    <span className="text-danger">
                      {errors?.longitude?.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group>
                  <InputGroup>
                    <InputGroup.Text>
                      <GeoAltFill size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="latitude"
                      {...register("latitude", { ...latitudeRule })}
                    />
                  </InputGroup>
                  {errors?.latitude && (
                    <span className="text-danger">
                      {errors?.latitude?.message}
                    </span>
                  )}
                </Form.Group>

                <span className="text-center text-success">
                  <a
                    onClick={() => {
                      console.log("map");
                      setSHowMap(true);
                    }}
                  >
                    <GeoAltFill size={20} />+
                  </a>
                </span>
              </Stack>
            </div>
            <FloatingLabel controlId="2" label="Telephone">
              <Form.Control
                type="text"
                {...register("phone", {
                  ...phoneRule,
                })}
              />
              {errors?.phone && (
                <span className="text-danger">{errors?.phone?.message}</span>
              )}
            </FloatingLabel>
          </Stack>
        </Form>

        {showMap && (
          <div
            className="w-100 justify-content-center"
            style={{ width: "100%" }}
          >
            <Row>
              <Col md="auto">
                <span className="me-2 text-success">
                  <a
                    onClick={() => {
                      setSHowMap(false);
                    }}
                  >
                    <Check2Circle size={32} />
                  </a>
                </span>
              </Col>
              <Col>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Text>
                      <GeoAltFill size={20} />
                    </InputGroup.Text>
                    <Form.Control
                      style={{ width: "auto" }}
                      value={position.latitude}
                      placeholder="Latitude"
                      type="number"
                    />
                    <InputGroup.Text>
                      <At size={20} />
                    </InputGroup.Text>

                    <Form.Control
                      style={{ width: "auto" }}
                      placeholder="Longitude"
                      type="number"
                      value={position.longitude}
                    />
                    {/*  <InputGroup.Text></InputGroup.Text> */}
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <br />
            {console.log([position.latitude, position.longitude])}
            <MapContainer
              center={[position.latitude, position.longitude]}
              zoom={17}
              style={{ width: "100%", height: "50vh" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapClickHandler />
              <Marker
                icon={customIcon}
                position={[position.latitude, position.longitude]}
              >
                <Popup>
                  <GeoAltFill />
                </Popup>
              </Marker>
            </MapContainer>
            <div style={{ width: "100%" }}></div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={2}>
          <div className="ms-auto" />
          <Button variant="outline-secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="outline-success"
            onClick={handleSubmit(handleCreate)}
            disabled={!isDirty}
          >
            Creer
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePharmacyModal;
