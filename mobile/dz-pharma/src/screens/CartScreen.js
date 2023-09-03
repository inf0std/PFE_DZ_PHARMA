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
import Animated, { FadeInDown } from "react-native-reanimated";

const CartScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [count, setCount] = useState(5);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

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
            Mon ordonnance
          </Text>
        </View>
      </View>

      <View style={{ padding: 12, flex: 1 }}>
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#2d2d2d",
                }}>{`Paracetamol`}</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#66eea6",
                }}>{`500 mg`}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFF",
                justifyContent: "space-between",
                borderRadius: 10,
              }}>
              <TouchableOpacity onPress={decrementCount}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#2d2d2d",
                    paddingLeft: 5,
                    marginHorizontal: 5,
                  }}>{`-`}</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 22,
                  color: "#2d2d2d",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                {count}
              </Text>
              <TouchableOpacity onPress={incrementCount}>
                <Text
                  style={{
                    fontSize: 30,
                    color: "#2d2d2d",
                    paddingRight: 5,
                    marginHorizontal: 5,
                  }}>{`+`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <View style={{ flex: 1 }} />

        <Animated.View entering={FadeInDown.delay(1200).duration(400)}>
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 12,
                borderTopWidth: 2,
                borderColor: "#b8b8b8",
              }}></View>

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
              onPress={() => navigation.navigate("PhamaList")}>
              <Text
                style={{
                  fontSize: 20,

                  color: "#FFF",
                }}>
                confirmer
              </Text>
            </TouchableOpacity>
          </>
        </Animated.View>
      </View>
    </View>
  );
};

export default CartScreen;
