import React, { useEffect, useState } from "react";
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
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutRight,
} from "react-native-reanimated";
import {
  removeMed,
  incMedCount,
  decMedCount,
  findPrescription,
  reset,
} from "../redux/slices/cart/cartSlice";

import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import DraggableMedElement from "../components/draggableMedElem";
const CartScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [userLocation, setUserLocation] = useState({
    latitude: 36.69707839807785,
    longitude: 4.056080912925099,
  });
  const [locationPermission, setLocationPermission] = useState(null);
  const { results, fetching, error, meds } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const incrementCount = (index) => () => {
    dispatch(incMedCount(index));
  };

  const decrementCount = (index) => () => {
    dispatch(decMedCount(index));
  };

  const handleConfirm = () => {
    dispatch(
      findPrescription({
        ids: meds.map((med) => med.med.ID),
        position: userLocation,
      })
    );
  };

  const handleResetCart = () => {
    dispatch(reset());
  };

  useEffect(() => {
    // Request location permissions and get user's location
    (async () => {
      let { status } = await Location.requestForegroundPermissonsAsync();
      console.log("status", status);
      if (status !== "granted") {
        console.log(status);
        setLocationPermission(status);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location", location);
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      //setLocationPermission(status);
    })();
  }, []);
  useEffect(() => {
    results && navigation.navigate("PhamaList");
  }, [results]);

  useEffect(() => {
    !meds.length && navigation.goBack();
  }, [meds]);
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f4f9", paddingVertical: 40 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          backgroundColor: "#FFF",
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={20} color="#b8b8b8" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              marginTop: 3,
              marginLeft: 5,
            }}>
            Mes Medicaments
          </Text>
        </View>
      </View>
      <View
        style={{
          width: width - 10,
          height: 2,
          backgroundColor: "#f1f1f1",
          alignSelf: "center",
        }}
      />
      <View style={{ padding: 12, flex: 1, backgroundColor: "#ffffff" }}>
        <ScrollView>
          {meds.map((cartItem, index) => (
            <DraggableMedElement
              key={index}
              med={cartItem}
              index={index}
              decrementCount={decrementCount}
              incrementCount={incrementCount}
            />
          ))}
        </ScrollView>

        <View style={{ flex: 1 }} />

        <Animated.View entering={FadeInDown.delay(1000).duration(400)}>
          <TouchableOpacity
            style={{
              backgroundColor: "#4fb69a",
              paddingVertical: 6,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              width: 250,
              alignSelf: "center",
            }}
            onPress={handleConfirm}>
            <Text
              style={{
                fontSize: 20,

                color: "#FFF",
              }}>
              confirmer
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1200).duration(400)}>
          <TouchableOpacity
            style={{
              backgroundColor: "#b64f9a",
              paddingVertical: 6,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              width: 250,
              alignSelf: "center",
            }}
            onPress={handleResetCart}>
            <Text
              style={{
                fontSize: 20,

                color: "#FFF",
              }}>
              Reinitialiser
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default CartScreen;
