// MapScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import {
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";

import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { Linking } from "react-native";
import axios from "axios";
import { API_URL } from "../../config";
import { HOST } from "../constants";

const LocalMapScreen = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 36.69707839807785,
    longitude: 4.056080912925099,
  });
  const [locationPermission, setLocationPermission] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  const getLocation = async () => {
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
  };
  useEffect(() => {
    // Request location permissions and get user's location
  }, []);
  useEffect(() => {
    console.log("location permission", locationPermission);
    locationPermission !== "granted" && getLocation();
  }, [locationPermission]);

  useEffect(() => {
    // Fetch the list of pharmacies using Axios
    console.log("\n\n\n\n\n\nbegin\n\n\n\n\n\n");
    getLocation();

    console.log(
      "gttin pharma",
      `${HOST}/api/v1/pharmacies/list?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
    );
    axios
      .get(
        `${HOST}/api/v1/pharmacies/list?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
      )
      .then((response) => {
        // Convert latitude and longitude strings to numbers
        console.log(response.data);
        const pharmaciesWithNumbers = response.data.map((pharmacy) => ({
          ...pharmacy,
          latitude: parseFloat(pharmacy.latitude),
          longitude: parseFloat(pharmacy.longitude),
        }));
        setPharmacies(pharmaciesWithNumbers);
        console.log(pharmaciesWithNumbers + "0000000000000hdhdh");
      })
      .catch((error) => {
        console.error("\n\nError fetching pharmacies:", error, "\n\n");
      });
  }, []);
  useEffect(() => {
    pharmacies.length == 0 &&
      axios
        .get(
          `${API_URL}/api/v1/pharmacies/list?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
        )
        .then((response) => {
          // Convert latitude and longitude strings to numbers
          console.log(response.data);
          const pharmaciesWithNumbers = response.data.map((pharmacy) => ({
            ...pharmacy,
            latitude: parseFloat(pharmacy.latitude),
            longitude: parseFloat(pharmacy.longitude),
          }));
          setPharmacies(pharmaciesWithNumbers);
        })
        .catch((error) => {
          console.error("\n\nError fetching pharmacies:", error, "\n\n");
        });
  }, [pharmacies]);

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
              title="votre position"
              description="votre position"
            />
            {pharmacies?.map((pharmacy, index) => (
              <Marker
                {...console.log(pharmacy)}
                key={index}
                coordinate={{
                  latitude: pharmacy.latitude,
                  longitude: pharmacy.longitude,
                }}
                title={pharmacy.nom} //{pharmacy.name}
                description="test" //{pharmacy.phone}
                pinColor="#002200"
              />
            ))}
            {/* <Marker
              coordinate={{
                latitude: 36.712691747354654,
                longitude: 3.99353495582114,
              }}
              title="test2"
              description="test2"
              pinColor="green"
            /> */}
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
      {/* <View style={{ position: "absolute", bottom: 19, right: 52 }}>
        {/* <Button title="Open Itinerary" onPress={openDirections} /> }
        <MaterialIcons
          name="directions"
          size={35}
          onPress={openItenerary}
          color={"red"}
        />
      </View> */}
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

export default LocalMapScreen;
{
  /* <MaterialIcons name="local-pharmacy" size={40} color="red" /> */
}
{
  /* <Fontisto name="map-marker-alt" size={20} color="green" />
                </Marker> */
}
