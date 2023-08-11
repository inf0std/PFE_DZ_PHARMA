import React from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import getUserIdFromStorage from "../utils/storageUtils";
import { API_URL } from "../../config";
import axios from "axios";
import FadeIn from "../components/FadeIn";
import LottieView from "lottie-react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Profil = ({ navigation }) => {
  const [user, setUser] = React.useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user?userId=${userId}`);
      setUser(response.data); // Update the state with the fetched user data
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  React.useEffect(() => {
    const fetchUserIdFromStorage = async () => {
      const userId = await getUserIdFromStorage();
      if (userId) {
        console.log("User ID:", userId);
        // Fetch user data using the retrieved user ID
        fetchUserData(userId);
      } else {
        console.log("User ID not found or an error occurred.");
      }
    };

    const unsubscribe = navigation.addListener("focus", fetchUserIdFromStorage);

    // Cleanup function
    return () => {
      unsubscribe();
      // Additional cleanup if needed
    };
  }, [navigation]);

  // Function to get initials from the username
  const getInitials = (name) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0] + n[1])
      .join("")
      .toUpperCase();
  };

  const handleSignOut = () => {
    // Implement your sign-out logic here
  };

  const handleEditUser = () => {
    navigation.navigate("Editprofile", { userId: user.user_id });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <View style={{ padding: 12 }}>
          {user && (
            <FadeIn delay={300}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 40,
                  paddingBottom: 30,
                  borderBottomColor: "#6e7e87",
                  borderBottomWidth: 0.5,
                }}>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 45,
                    backgroundColor: "#50e3c2",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}>
                  <Text style={{ color: "black", fontSize: 30 }}>
                    {getInitials(user.username)}
                  </Text>
                </View>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#00a5ff",
                    borderRadius: 10,
                    position: "absolute",
                    left: 75,
                    borderColor: "#0b0f20",
                    borderWidth: 2,
                  }}
                />
                <View style={{ marginLeft: 20, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Medium",
                      color: "black",
                    }}>
                    {user.username}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins-Medium",
                      color: "#6e7e87",
                    }}>
                    {user.email}
                  </Text>
                </View>
              </View>
            </FadeIn>
          )}
          <FadeIn delay={600}>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#3b2924",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}>
                  <MaterialIcons
                    name="notifications-none"
                    size={20}
                    color={"#ff9844"}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 10,
                  }}>
                  Notifications
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", marginTop: 20 }}>
                <View
                  style={{
                    backgroundColor: "#28194c",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}>
                  <MaterialIcons name="lock-open" size={20} color={"#8300ff"} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 10,
                  }}>
                  Privacy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 20 }}
                onPress={handleEditUser}>
                <View
                  style={{
                    backgroundColor: "#1c3f4c",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}>
                  <MaterialIcons name="security" size={20} color={"#32b1b7"} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 10,
                  }}>
                  Edit profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", marginTop: 20 }}>
                <View
                  style={{
                    backgroundColor: "#3b242f",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}>
                  <MaterialIcons name="chat" size={20} color={"#ff4339"} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 10,
                  }}>
                  Chat
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", marginTop: 20 }}>
                <View
                  style={{
                    backgroundColor: "#1b344c",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}>
                  <MaterialIcons
                    name="notifications-none"
                    size={20}
                    color={"#097fc3"}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 10,
                  }}>
                  Help
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", marginTop: 20 }}>
                <View
                  style={{
                    backgroundColor: "#253b1f",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}>
                  <MaterialIcons name="report" size={20} color={"#91ec1d"} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 10,
                  }}>
                  Report
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 20 }}
                onPress={handleSignOut}>
                <View
                  style={{
                    backgroundColor: "#3b194b",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}>
                  <MaterialIcons
                    name="notifications-none"
                    size={20}
                    color={"#fe00f9"}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 10,
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </FadeIn>
        </View>
      </View>
    </View>
  );
};

export default Profil;
