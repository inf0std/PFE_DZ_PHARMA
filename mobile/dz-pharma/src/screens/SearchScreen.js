import React, { useState, useEffect, useSyncExternalStore } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Fontisto,
  Octicons,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { medList } from "../redux/slices/meds/medsSlice";
import { addMed } from "../redux/slices/cart/cartSlice";

import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
const SearchScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { meds } = useSelector((state) => state.meds);
  const cart = useSelector((state) => state.cart);
  const [searchText, setSearchText] = useState("");
  const [prescreption, setPrescreption] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  //console.log(meds);
  //console.log(meds.list, "medlist");
  const dispatch = useDispatch();
  meds?.list?.length == 0 && dispatch(medList());
  //console.log("type medlist", typeof meds?.list);

  const addToPrescreption = (med) => () => {
    setPrescreption([...prescreption, med]);
    dispatch(addMed(med));
    setSearchResults((searchResults) =>
      searchResults.filter((_med) => _med.ID !== med.ID)
    );
  };

  const resetPrescreption = () => {
    setPrescreption([]);
  };

  const filterMedsPrescription = (_meds) => {
    return _meds.filter(
      (med) => !prescreption.find((p_med) => p_med.ID == med.ID)
    );
  };

  const filterMeds = (search) => {
    let exp = new RegExp(search, "i");

    if (search !== "") {
      if (search.length > searchText.length && searchText != "") {
        setSearchText(() => search);

        setSearchResults((searchResults) =>
          filterMedsPrescription(searchResults).filter((med) =>
            exp.test(med.MARQUE)
          )
        );
      } else {
        setSearchText(() => search);
        setSearchResults(() =>
          filterMedsPrescription(meds.list).filter((med) =>
            exp.test(med.MARQUE)
          )
        );
      }
    } else {
      console.log("empty search string");
      setSearchText("");
      setSearchResults([]);
    }
    console.log("search", search);
  };
  useEffect(() => {
    cart.results && dispatch(reset());
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#FFF",
          padding: 12,
          borderRadius: 10,
          marginTop: 20,
          width: width * 0.95,
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <TextInput
          value={searchText}
          onChangeText={(e) => {
            filterMeds(e);
          }}
          style={{ flex: 1, color: "#4fb69a" }}
        />
        {/* <Button onPress={() => filterMeds("")} title="X" /> */}
        <FontAwesome5
          name="times"
          size={30}
          color="#4fb69a"
          onPress={() => filterMeds("")}
        />
      </View>
      {/* Your search implementation goes here */}

      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 10,
                color: "#151516",
                marginBottom: -3,
              }}></Text>
          </View>

          <TouchableOpacity
            style={{
              position: "absolute",
              right: 3,
              top: 12,
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: "#4fb69a",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{
                fontSize: 12,
                color: "#FFF",
              }}>
              {cart.meds.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            {/* <MaterialIcons name="shopping-cart" size={24} color="#313132" /> */}
            {/*  <MaterialCommunityIcons name="pill" size={24} color="#313132" /> */}
            {/*  <FontAwesome5 name="pills" size={24} color="#313132" /> */}
            <Octicons name="checklist" size={35} color={"#313132"} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ width: "95%" }}
          data={searchResults}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#AAAAAA",
                width: "98%",
                margin: 2,
                padding: 10,
              }}>
              <TouchableOpacity onPress={addToPrescreption(item)}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    alignSelf: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  {`${item.MARQUE}\n${item.FORME}:${item.DOSAGE}`}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {/* <Text>{prescreption.length}</Text> */}
        {/* {pharmacies?.map((pharmacy) => (
          <PharmacyCard key={pharmacy.pharmacie_id} pharmacy={pharmacy} />
        ))} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollViewContentContainer: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SearchScreen;
