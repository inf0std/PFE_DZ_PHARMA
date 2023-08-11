import { useEffect, useState } from "react";

const SingleUserPage = () => {
  const [userData, setUserData] = useState(null); // To store the user data

  useEffect(() => {
    // Get the user ID from session storage
    const userId = sessionStorage.getItem("userId");

    // Fetch user information using the user ID
    fetchUserInformation(userId);
  }, []);

  // Function to fetch user information
  const fetchUserInformation = (userId) => {
    // Replace this with your actual API endpoint to fetch user information based on the user ID
    fetch(`http://localhost:8080/user?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched user data to the state
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  };

  // Render the user data when it's available
  return (
    <div>
      {userData ? (
        <>
          <h2>User Information</h2>
          <p>Name: {userData.username}</p>
          <p>Email: {userData.email}</p>
          {/* Add more user details as needed */}
        </>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default SingleUserPage;
