import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, FormControl, Button } from "react-bootstrap";

const StockTable = ({ pharmaId }) => {
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getStockList?pharmaId=${pharmaId}`
      ); // Update the URL as needed
      setStockList(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const [editedStock, setEditedStock] = useState([]);

  useEffect(() => {
    // Initialize the editedStock array with the same data as stockList
    setEditedStock(stockList.map((stock) => ({ ...stock })));
  }, [stockList]);

  const handleInputChange = (index, field, value) => {
    const updatedStock = [...editedStock];
    updatedStock[index][field] = value;
    setEditedStock(updatedStock);
  };

  const handleSaveChanges = () => {
    // Here you can implement the logic to save the editedStock data to the server
    // For example, you can use fetch or Axios to send the updated data to your API
    // After saving, you can reset the editedStock state or update it with the server response
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Stock quantity</th>
            <th>Pharmacie ID</th>
            <th>Medicament ID</th>
            <th>Medicament Name</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {editedStock.map((stock, index) => (
            <tr key={stock.id}>
              <td>
                <FormControl
                  type="number"
                  value={stock.quantity}
                  onChange={(e) =>
                    handleInputChange(index, "quantity", e.target.value)
                  }
                />
              </td>
              <td>{stock.pharmacie_id}</td>
              <td>{stock.medicament_id}</td>
              <td>{stock.nom_de_marque}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleSaveChanges}>
        Save
      </Button>
    </div>
  );
};

export default StockTable;
