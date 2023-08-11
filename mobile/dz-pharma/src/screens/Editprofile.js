import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { API_URL } from "../../config";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
const Editprofile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const route = useRoute();
  const userId = route.params?.userId;
  const navigation = useNavigation();

  const handleUpdate = async () => {
    console.log(userId);
    try {
      const response = await fetch(`${API_URL}/users/edit/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any other necessary headers here
        },
        body: JSON.stringify({ username, email }),
      });

      if (response.ok) {
        alert("Update successful");
        navigation.goBack();
        // You might want to show a success message or navigate to another screen
      } else {
        // Handle error
        const errorData = await response.json();
        console.error("Update error:", errorData);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Update" onPress={handleUpdate} color="#50e3c2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});

export default Editprofile;
