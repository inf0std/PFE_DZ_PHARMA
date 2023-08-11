// BottomTabNavigator.js

import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from @expo/vector-icons

import { View, Text, Image, TouchableOpacity } from "react-native";
import Profil from "../screens/Profil";
import SearchScreen from "../screens/SearchScreen"; // Import the SearchScreen component
import MapScreen from "../screens/MapScreen"; // Import the MapScreen component
import getUserIdFromStorage from "../utils/storageUtils";
import { API_URL } from "../../config";
import axios from "axios";

const CustomHeader = ({ username }) => {
  // Function to get initials from the username
  const getInitials = (name) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0] + n[1])
      .join("")
      .toUpperCase();
  };

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#50e3c2",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}>
        <Text style={{ color: "#FFF", fontSize: 16 }}>
          {getInitials(username)}
        </Text>
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [user, setUser] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user?userId=${userId}`);
      setUser(response.data); // Update the state with the fetched user data
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
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
    fetchUserIdFromStorage();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => user && <CustomHeader username={user.username} />,
        headerRightContainerStyle: { marginRight: 20 },
      }}>
      {/* Profil screen */}
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Search screen */}
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Map screen */}
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
