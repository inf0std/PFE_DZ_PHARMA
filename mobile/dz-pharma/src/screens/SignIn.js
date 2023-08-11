import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../../config";
const SignIn = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [isLoading, setIsLoading] = React.useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignIn = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/SignIn`, {
        email,
        password,
      });
      console.log(response.data); // You can do something with the response here if needed
      setIsLoading(false);
      // Save the user ID to AsyncStorage
      const userId = response.data.user.user_id.toString();
      await AsyncStorage.setItem("userId", userId);
      navigation.navigate("BottomTab"); // Navigate to the bottom tab screen after successful sign-in
    } catch (error) {
      console.log("Error signing in:", error);
      setIsLoading(false);
      setError("Invalid credentials. Please try again."); // Display an error message if sign-in fails
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF", padding: 20 }}>
      <>
        <Animated.View entering={FadeInDown.delay(300).duration(300)}>
          <Image
            source={require("./save.png")}
            style={{
              width: 175,
              height: 175,
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
            Welcome to Pharma_DZ
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#323646",
              alignSelf: "center",
            }}>
            Make your day great!
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).duration(300)}
          style={{ flex: 1 }}>
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
            style={{
              backgroundColor: "#50e3c2",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              marginTop: 20,
            }}
            onPress={handleSignIn}>
            <Text
              style={{
                fontSize: 16,
                color: "#FFF",
              }}>
              Login
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
          <Text
            style={{
              fontSize: 14,
              color: "#50e3c2",
              padding: 10,
              textAlign: "center",
            }}>
            Forgot password?
          </Text>

          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "flex-end",
            }}
            onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                fontSize: 14,
                color: "#323646",
              }}>
              Don't have an account?{" "}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#50e3c2",
              }}>
              Register!
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </>
    </View>
  );
};

export default SignIn;