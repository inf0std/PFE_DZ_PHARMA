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
} from "../redux/slices/cart/cartSlice";

import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import DraggableMedElement from "../components/draggableMedElem";
const CartScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [userLocation, setUserLocation] = useState(null);
  const cart = useSelector((state) => state.cart);
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
        meds: cart.meds,
        position: userLocation,
      })
    )
      .then(() => navigation.navigate("PhamaList"))
      .catch(console.log);
  };

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
      //setLocationPermission(status);
    })();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f4f9", paddingVertical: 40 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          backgroundColor: "#FFF",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={20} color="#b8b8b8" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              marginTop: 3,
              marginLeft: 5,
            }}
          >
            Mon ordonnance
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
          {cart.meds.map((cartItem, index) => (
            <DraggableMedElement
              med={cartItem}
              index={index}
              decrementCount={decMedCount}
              incrementCount={incrementCount}
            />
            /* <Animated.View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",

                  paddingVertical: 5,
                }}
              >
               
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#2d2d2d",
                    }}
                  >{`${cartItem.med.MARQUE}`}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#66eea6",
                    }}
                  >{`${cartItem.med.FORME}`}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#66eea6",
                    }}
                  >{`${cartItem.med.DOSAGE}`}</Text>
                </View>
               
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#F1F1F1",
                    justifyContent: "space-between",
                    borderRadius: 10,
                  }}
                >
                  <TouchableOpacity
                    disabled={cartItem.count == 1}
                    onPress={decrementCount(index)}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        color: "#2d2d2d",
                        paddingLeft: 5,
                        marginHorizontal: 5,
                      }}
                    >{`-`}</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 22,
                      color: "#2d2d2d",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  >
                    {cartItem.count}
                  </Text>
                  <TouchableOpacity onPress={incrementCount(index)}>
                    <Text
                      style={{
                        fontSize: 30,
                        color: "#2d2d2d",
                        paddingRight: 5,
                        marginHorizontal: 5,
                      }}
                    >{`+`}</Text>
                  </TouchableOpacity>
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
            </Animated.View> */
          ))}
        </ScrollView>
        {/* <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#2d2d2d",
                }}
              >{`Paracetamol`}</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#66eea6",
                }}
              >{`500 mg`}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFF",
                justifyContent: "space-between",
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={decrementCount}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#2d2d2d",
                    paddingLeft: 5,
                    marginHorizontal: 5,
                  }}
                >{`-`}</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 22,
                  color: "#2d2d2d",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                {count}
              </Text>
              <TouchableOpacity onPress={incrementCount}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#2d2d2d",
                    paddingRight: 5,
                    marginHorizontal: 5,
                  }}
                >{`+`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View> */}

        <View style={{ flex: 1 }} />

        <Animated.View entering={FadeInDown.delay(1200).duration(400)}>
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
            onPress={handleConfirm}
          >
            <Text
              style={{
                fontSize: 20,

                color: "#FFF",
              }}
            >
              confirmer
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default CartScreen;
