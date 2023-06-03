import React from "react";
import { Table } from "react-bootstrap";

function DataTable({ data, detailsF }) {
  if (data.length === 0) {
    return <div>No data available.</div>;
  }
  const features = Object.keys(data[0]);

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          {features.map((feature) => (
            <th key={feature}>{feature}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((obj) => (
          <tr
            key={obj.id}
            onClick={(e) => {
              detailsF(obj.id);
            }}
          >
            {features.map((feature) => (
              <td key={`${obj.id}-${feature}`}>{obj[feature]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DataTable;
