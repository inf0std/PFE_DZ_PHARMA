import React, { useState, useEffect, useRef } from "react";
import { useFetchMedicinesQuery } from "../../service/api/medicineApi";
import DataTable from "../../componant/table";
import { Row, Col, Pagination } from "react-bootstrap";
import { ArrowClockwise } from "react-bootstrap-icons";
//import { RotatingLines } from "react-loader-spinner";
const per_page = 10;
const MedicinesPage = ({ notify }) => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const changePage = (page) => {};
  const {
    data: medicines,
    error,
    isLoading,
    refetch,
  } = useFetchMedicinesQuery();
  console.log("meds", medicines);
  useEffect(() => {
    error &&
      notify({ type: "error", message: "echec de chargement des medicaments" });
  }, [error]);

  useEffect(() => {
    medicines && setCount(medicines.length);
  }, [medicines]);

  return (
    <>
      {medicines && (
        <>
          <Row className="mt-2">
            {" "}
            <DataTable
              data={medicines.slice(page * per_page, (page + 1) * per_page)}
              rowSpanFn={() => 1}
              clickFn={console.log}
            />
          </Row>
          <Row>
            <Col />

            <Col md="auto">
              <Pagination className="shadow">
                <Pagination.First disabled={page == 0} />
                <Pagination.Ellipsis hidden={page == 0} />
                <Pagination.Item>{page + 1}</Pagination.Item>
                <Pagination.Ellipsis
                  hidden={page == Math.ceil(count / per_page)}
                />
                <Pagination.Last
                  disabled={page == Math.ceil(count / per_page)}
                />
              </Pagination>
            </Col>
            <Col />
          </Row>
        </>
      )}
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
      {/* {isLoading && (
        <Row className="align-items-center" style={{ height: "80vh" }}>
          <Col />
          <Col md="auto">
            <RotatingLines />
          </Col>
          <Col />
        </Row>
      )} */}
    </>
  );
};

export default MedicinesPage;
