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

import { Feather } from "@expo/vector-icons";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { Linking } from "react-native";

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 36.69707839807785,
    longitude: 4.056080912925099,
  });
  const [locationPermission, setLocationPermission] = useState(null);
  const cart = useSelector((state) => state.cart);
  console.log("___________________cart_____________________", cart);
  const openItenerary = () => {
    const waypoints = [
      userLocation,
      ...cart.results[cart.displayedResult].pharmacies,
    ]
      .map((pharma) => `${pharma.latitude},${pharma.longitude}`)
      .join("|");

    const origin = userLocation; //cart.results[cart.displayedResult].pharmacies[0];
    const destination =
      cart.results[cart.displayedResult].pharmacies[
        cart.results[cart.displayedResult].pharmacies.length - 1
      ];

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&waypoints=${waypoints}`;

    Linking.openURL(url);
  };

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
    getLocation();
  }, []);
  useEffect(() => {
    console.log("location permission", locationPermission);
    locationPermission !== "granted" && getLocation();
  }, [locationPermission]);

  const [pharmacies, setPharmacies] = useState([]);
  /* 
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
  }, []); */

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
            {cart.results[cart.displayedResult].pharmacies?.map(
              (pharmacy, index) => (
                <Marker
                  {...console.log(pharmacy)}
                  key={index}
                  coordinate={{
                    latitude: Number.parseFloat(pharmacy.latitude),
                    longitude: Number.parseFloat(pharmacy.longitude),
                  }}
                  title="pharmacie" //{pharmacy.name}
                  description="test" //{pharmacy.phone}
                  pinColor="#002200"
                />
              )
            )}
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
      <View style={{ position: "absolute", bottom: 19, right: 52 }}>
        {/* <Button title="Open Itinerary" onPress={openDirections} /> */}
        <MaterialIcons
          name="directions"
          size={35}
          onPress={openItenerary}
          color={"red"}
        />
      </View>
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
{
  /* <MaterialIcons name="local-pharmacy" size={40} color="red" /> */
}
{
  /* <Fontisto name="map-marker-alt" size={20} color="green" />
                </Marker> */
}
