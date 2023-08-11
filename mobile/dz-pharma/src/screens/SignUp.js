import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import axios from "axios";
import { API_URL } from "../../config";
const SignUp = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/SignUp`, {
        email,
        password,
        username,
      });
      console.log(response.data); // You can do something with the response here if needed
      setIsLoading(false);
      navigation.navigate("SignIn"); // Navigate to the sign-in screen after successful registration
    } catch (error) {
      console.log("Error registering user:", error);
      setIsLoading(false);
      setError("An error occurred. Please try again later."); // Display a generic error message to the user
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF", padding: 20 }}>
      <>
        <Image
          source={require("./save.png")}
          style={{
            width: 175,
            height: 140,
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: 20,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            color: "#323646",
            alignSelf: "center",
            marginTop: 20,
          }}>
          Pharma_DZ
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#323646",
            alignSelf: "center",
          }}>
          Make your day great!
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#323646",
            marginTop: 20,
          }}>
          Pseudo
        </Text>
        <View
          style={{
            backgroundColor: "#f6f6f6",
            height: 50,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={{
              color: "#323646",
              padding: 10,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            color: "#323646",
            marginTop: 20,
          }}>
          Email
        </Text>
        <View
          style={{
            backgroundColor: "#f6f6f6",
            height: 50,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{
              color: "#323646",
              padding: 10,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            color: "#323646",
            marginTop: 20,
          }}>
          Password
        </Text>
        <View
          style={{
            backgroundColor: "#f6f6f6",
            height: 50,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={{
              color: "#323646",
              padding: 10,
              width: 300,
            }}
          />
          <Feather name="eye" size={24} color="#323646" />
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          style={{
            backgroundColor: "#50e3c2",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: "#FFF",
            }}>
            S'inscrire
          </Text>
        </TouchableOpacity>
        {error !== "" && (
          <Text
            style={{
              fontSize: 14,
              color: "red",
              padding: 10,
              textAlign: "center",
            }}>
            {error}
          </Text>
        )}

        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "flex-end",
          }}>
          <Text
            style={{
              fontSize: 14,
              color: "#323646",
            }}>
            Don't have an account?{" "}
          </Text>
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            <Text
              style={{
                fontSize: 14,
                color: "#50e3c2",
              }}>
              Se connecter!
            </Text>
          </Pressable>
        </TouchableOpacity>
      </>
    </View>
  );
};

export default SignUp;
