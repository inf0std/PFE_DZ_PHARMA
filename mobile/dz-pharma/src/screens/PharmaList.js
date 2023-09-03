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

const PharmaList = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");

  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        padding: 18,
        paddingVertical: 50,
      }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            width: 34,
            height: 34,
            backgroundColor: "#4fb69a",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}>
          <Text style={{ color: "#FFF", fontSize: 23 }}>
            {isVisible ? `1` : "0"}
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: "#4fb69a",
          fontSize: 20,
          marginTop: 20,
        }}>{`Resultats`}</Text>
      <View
        style={{
          width: width - 10,
          height: 2,
          backgroundColor: "#f1f1f1",
          alignSelf: "center",
        }}
      />

      {isVisible && (
        <>
          <Animated.View
            entering={FadeInRight.delay(0).duration(0)}
            exiting={FadeOutRight.delay(500).duration(500)}>
            <View style={{ flexDirection: "row", paddingVertical: 20 }}>
              <View
                style={{
                  alignSelf: "center",
                  flex: 0.3,
                  alignItems: "center",
                }}>
                <FontAwesome5 name="clinic-medical" size={60} color="#4fb69a" />
              </View>
              <View style={{ flex: 0.5 }}>
                <Text
                  style={{
                    color: "#818181",
                    fontSize: 18,
                  }}>{`Pharmacie cherifi`}</Text>
                {/*<Text
                  style={{
                    color: "#818181",
                    fontSize: 14,
                    marginTop: -5,
                  }}>{`Add New Article`}</Text>*/}
                <Text
                  style={{
                    color: "#4fb69a",
                    fontSize: 14,
                    marginTop: 10,
                  }}>{`Ouvert`}</Text>
              </View>

              <View
                style={{
                  flex: 0.2,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: "#f9f9f9",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}>
                  <Feather
                    name="map-pin"
                    size={28}
                    color="#4fb69a"
                    onPress={() => navigation.navigate("Map")}
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
      )}

      <TouchableOpacity
        style={{
          padding: 12,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 5,
          left: width / 2 - 40,
        }}
        onPress={() => setIsVisible((prev) => !prev)}>
        <Text style={{ color: "#e74c3c", fontSize: 14 }}>{`clear all`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PharmaList;
