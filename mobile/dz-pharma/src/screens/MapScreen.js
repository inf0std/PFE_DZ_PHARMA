// MapScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";
import PharmacyCard from "../components/PharmacyCard";
import axios from "axios";
import { API_URL } from "../../config";

import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    // Request location permissions and get user's location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationPermission(status);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocationPermission(status);
    })();
  }, []);

  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    // Fetch the list of pharmacies using Axios
    axios
      .get(`${API_URL}/list`)
      .then((response) => {
        // Convert latitude and longitude strings to numbers
        const pharmaciesWithNumbers = response.data.map((pharmacy) => ({
          ...pharmacy,
          latitude: parseFloat(pharmacy.latitude),
          longitude: parseFloat(pharmacy.longitude),
        }));
        setPharmacies(pharmaciesWithNumbers);
      })
      .catch((error) => {
        console.error("Error fetching pharmacies:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {locationPermission === "granted" ? (
        userLocation ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={userLocation}
              title="You are here"
              description="Your current location"
            />
            {pharmacies?.map((pharmacy) => (
              <Marker
                key={pharmacy.pharmacie_id}
                coordinate={{
                  latitude: pharmacy.latitude,
                  longitude: pharmacy.longitude,
                }}
                title={pharmacy.name}
                description={pharmacy.phone}>
                <MaterialIcons name="local-pharmacy" size={40} color="red" />
              </Marker>
            ))}
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )
      ) : (
        <Text>
          Location permission required. Please enable location services in your
          device settings.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
