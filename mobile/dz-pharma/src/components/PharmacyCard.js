import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Feather,
  FontAwesome5,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeIn,
} from "react-native-reanimated";
const PharmacyCard = ({ pharmacy }) => {
  return (
    <View>
      <Animated.View
        style={{
          marginTop: 20,
          padding: 20,
          backgroundColor: "#70dfb9",
          borderRadius: 20,
          width: 320,
        }}
        entering={FadeIn.delay(300).duration(2000)}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#FFF",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 20,
            }}>
            <MaterialIcons name="local-pharmacy" size={50} color="#70dfb9" />
          </View>

          <View>
            <Text style={{ fontSize: 20, color: "#FFF" }}>{pharmacy.name}</Text>
            <Text style={{ fontSize: 15, color: "#FFF" }}>
              {pharmacy.phone}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                <Entypo name="star" size={15} color="#fbf30d" />
                <Entypo name="star" size={15} color="#fbf30d" />
                <Entypo name="star" size={15} color="#fbf30d" />
                <Entypo name="star" size={15} color="#fbf30d" />
                <Entypo name="star" size={15} color="#fbf30d" />
              </View>
              <Text style={{ fontSize: 13, color: "#FFF", marginLeft: 5 }}>
                9,200
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            borderWidth: 1,
            borderColor: "#FFF",
            paddingHorizontal: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 16, color: "#FFF" }}>consulter</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PharmacyCard;
