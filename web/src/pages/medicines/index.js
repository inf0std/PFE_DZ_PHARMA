import React, { useState, useEffect, useRef } from "react";
import { useFetchMedicinesQuery } from "../../service/api/medicineApi";
import DataTable from "../../componant/table";
import { Row, Col } from "react-bootstrap";
import { ArrowClockwise } from "react-bootstrap-icons";
import { RotatingLines } from "react-loader-spinner";
const MedicinesPage = ({ notify }) => {
  const {
    data: medicines,
    error,
    isLoading,
    refetch,
  } = useFetchMedicinesQuery();

  useEffect(() => {
    error &&
      notify({ type: "error", message: "echec de chargement des medicaments" });
  }, [error]);
  return (
    <>
      {medicines && <DataTable data={[]} />}
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
      {isLoading && (
        <Row className="align-items-center" style={{ height: "80vh" }}>
          <Col />
          <Col md="auto">
            <RotatingLines />
          </Col>
          <Col />
        </Row>
      )}
    </>
  );
};

export default MedicinesPage;
