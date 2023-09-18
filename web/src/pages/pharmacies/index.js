import { useDispatch, useSelector } from "react-redux";
import { useFetchPharmaciesQuery } from "../../service/api/pharmacyApi";
import DataTable from "../../componant/table";
import { useEffect, useState } from "react";
import { ArrowClockwise } from "react-bootstrap-icons";
import { Col, Pagination, Row } from "react-bootstrap";
//import { RotatingLines } from "react-loader-spinner";

const PharmaciesPage = ({ notify }) => {
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });
  const {
    data: pharmacies,
    error,
    isLoading,
    refetch,
  } = useFetchPharmaciesQuery({ ...pagination });

  const parsePharmacies = (data) => {
    return data
      ? data?.map((pharma) => ({
          id: pharma.pharmacie_id,
          Nom: pharma.name,
          // Proprietaire: pharma.username,
          Latitude: pharma.latitude,
          Longitude: pharma.longitude,
          Telephone: pharma.phone,
        }))
      : [];
  };

  useEffect(() => {
    console.log(pharmacies);
  }, [pharmacies]);

  useEffect(() => {
    error &&
      notify({ type: "error", message: "echec de chargement de pharmacies" });
  }, [error]);

  return (
    <>
      {error && !isLoading && (
        <Row className="align-items-center" style={{ height: "80vh" }}>
          <div className="text-center align-items-center">
            <span>
              <a className="text-danger" onClick={refetch}>
                RECHARGER <ArrowClockwise />
              </a>
            </span>
          </div>
        </Row>
      )}
      {/*  {isLoading && (
        <Row className="align-items-center" style={{ height: "80vh" }}>
          <Col />
          <Col md="auto">
            <RotatingLines />
          </Col>
          <Col />
        </Row>
      )} */}
      {console.log(parsePharmacies(pharmacies))}
      {pharmacies && (
        <>
          <Row className="mt-2">
            <DataTable
              data={parsePharmacies(pharmacies)}
              detailsF={(id) => {
                console.log(id);
              }}
              rowSpanFn={() => 1}
              clickFn={console.log}
            />
          </Row>

          <Row>
            <Col />
            <Col md="auto">
              <Pagination className="shadow">
                <Pagination.First />
                <Pagination.Item>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Last />
              </Pagination>
            </Col>
            <Col />
          </Row>
        </>
      )}

      {pharmacies?.length == 0 && <p>pas de données a afficher</p>}
    </>
  );
};

export default PharmaciesPage;
