import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { FontAwesome5, Feather } from "react-native-vector-icons";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { setDisplayedResult } from "../redux/slices/cart/cartSlice";

const PharmaList = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = React.useState(true);
  console.log("cart", cart);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        padding: 18,
        paddingVertical: 50,
      }}>
      {/**back and count */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            color: "#4fb69a",
            fontSize: 20,
          }}>{`Resultats`}</Text>
      </View>
      {/**result */}

      <View
        style={{
          width: width - 10,
          height: 2,
          backgroundColor: "#f1f1f1",
          alignSelf: "center",
        }}
      />

      {cart?.results?.map((result, index) => (
        <>
          <Animated.View
            key={`index`}
            entering={FadeInRight.delay(0).duration(0)}
            exiting={FadeOutRight.delay(500).duration(500)}>
            <View style={{ flexDirection: "row", paddingVertical: 20 }}>
              {/**pharmacie icon */}
              <View
                style={{
                  alignSelf: "center",
                  flex: 0.15,
                  alignItems: "center",
                }}>
                <FontAwesome5 name="clinic-medical" size={30} color="#4fb69a" />
              </View>

              {/**details */}
              <View style={{ flex: 0.75 }}>
                <Text
                  style={{
                    color: "#818181",
                    fontSize: 18,
                  }}>{`score: ${result.score}`}</Text>

                <Text
                  style={{
                    color: "#818181",
                    fontSize: 18,
                  }}>{`distance: ${result.distance} km`}</Text>
                <Text
                  style={{
                    color: "#818181",
                    fontSize: 18,
                  }}>{`pharmacies(${result.pharmacies.length}):`}</Text>
                {result.pharmacies.map((pharmacy, i) => (
                  <Text
                    style={{
                      color: "#818181",
                      fontSize: 18,
                    }}>{`${i + 1}- ${pharmacy.nom}`}</Text>
                ))}
              </View>

              {/**map icon */}
              <View
                style={{
                  flex: 0.1,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}>
                <View
                  style={{
                    width: 30,
                    height: 50,
                    backgroundColor: "#f9f9f9",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}>
                  <MaterialCommunityIcons
                    name="map-marker-radius"
                    size={35}
                    color="#4fb69a"
                    onPress={() => {
                      dispatch(setDisplayedResult(index));
                      navigation.navigate("Map");
                    }}
                  />
                </View>
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
          </Animated.View>
        </>
      ))}
      {cart.results.length == 0 && (
        <View
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "80%",
          }}>
          <Text style={{ color: "#F00", fontSize: 26 }}>Aucun resultat</Text>
        </View>
      )}
    </View>
  );
};

export default PharmaList;
