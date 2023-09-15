import React from "react";
import { Row, Table, Col } from "react-bootstrap";

function DataTable({ data, clickFn, rowSpanFn }) {
  //console.log("table data", data);
  if (data.length === 0) {
    return (
      <Row>
        <Col />
        <Col md="auto">
          <div>Pas de données à afficher?</div>
        </Col>
        <Col />
      </Row>
    );
  }
  const features = Object.keys(data[0]);
  //console.log(features);

  const rowsFromRowSpan = (rowspan) => {
    let res = [];

    for (let i = 0; i < rowspan; i++) {
      res.push(i);
    }
    return res;
  };
  return (
    <Table
      responsive
      //striped
      bordered
      hover
    >
      <thead>
        <tr>
          {features.map((feature) => (
            // console.log(feature) ||
            <th key={feature}>{feature}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((obj) =>
          rowsFromRowSpan(rowSpanFn(obj)).map((index) => (
            <tr
              onClick={(e) => {
                clickFn(obj.id);
              }}
              key={`${obj.id}-${index}`}
            >
              {features.map((feature) =>
                obj[feature]?.array ? (
                  <td key={`${obj[feature]}-${index}-${feature}`}>
                    {obj[feature].values?.[index]}
                  </td>
                ) : (
                  index == 0 && (
                    <td
                      key={`${obj[feature]}-${index}-${feature}`}
                      rowSpan={rowSpanFn(obj)}
                    >
                      {obj[feature]}
                    </td>
                  )
                )
              )}
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default DataTable;
