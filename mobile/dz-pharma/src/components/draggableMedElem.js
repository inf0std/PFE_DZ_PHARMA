import React, { useRef } from "react";
import {
  View,
  PanResponder,
  Animated,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { removeMed } from "../redux/slices/cart/cartSlice";
import { useDispatch } from "react-redux";
const DraggableMedElement = ({
  med,
  index,
  decrementCount,
  incrementCount,
}) => {
  const { width, height } = Dimensions.get("window");
  const dispatch = useDispatch();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 50) {
          //alert("Action triggered!");
          dispatch(removeMed(index));
        }

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",

            paddingVertical: 5,
          }}
        >
          {/**details */}
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#2d2d2d",
              }}
            >{`${med.med.MARQUE}`}</Text>
            <Text
              style={{
                fontSize: 12,
                color: "#66eea6",
              }}
            >{`${med.med.FORME}`}</Text>
            <Text
              style={{
                fontSize: 12,
                color: "#66eea6",
              }}
            >{`${med.med.DOSAGE}`}</Text>
          </View>
          {/**count */}
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
              disabled={med.count == 1}
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
              {med.count}
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
      </Animated.View>
    </View>
  );
};

export default DraggableMedElement;
