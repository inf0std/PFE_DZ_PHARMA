import React, { useState, useEffect } from "react";
import { Table, Container, Button, Alert } from "react-bootstrap";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const fetchUser = () => {
    axios
      .get("http://localhost:8080/userslist")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const handleConfirm = (userId) => {
    // Here you can implement the logic to handle the confirmation
    // For example, you might update the status of the pharmacy as confirmed.
    // You can update the state or make an API call to update the backend data.
    // Remember to update the 'pharmacies' state accordingly.
    console.log(`Confirmed pharmacy with ID: ${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/users/edit/${userId}`, {
        isarchived: true,
      });
      fetchUser();
      console.log("User archived successfully");
    } catch (error) {
      console.error("Error archiving user:", error);
    }
    console.log(`Deleted pharmacy with ID: ${userId}`);
  };

  return (
    <Container>
      <h1>User List</h1>
      {showAlert && (
        <Alert
          variant={"success"}
          onClose={() => setShowAlert(false)}
          dismissible>
          User archived successfully
        </Alert>
      )}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th>Pharmacy ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_admin ? "Yes" : "No"}</td>
              <td>{user.idpharmacie || "N/A"}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleConfirm(user.user_id)}>
                  Confirmer
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleDelete(user.user_id)}>
                  supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
