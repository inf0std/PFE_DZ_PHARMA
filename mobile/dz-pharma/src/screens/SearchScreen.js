import React, { useState, useEffect } from "react";
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
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { medList } from "../redux/slices/meds/medsSlice";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
const SearchScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { meds } = useSelector((state) => state.meds);
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
    setSearchResults((searchResults) =>
      searchResults.filter((_med) => _med.ID !== med.ID)
    );
  };

  /* useEffect(() => {
    //fetch("h")

    console.log("listing meds useEffect");

    return () => {
      meds.list.length == 0 && dispatch(medList());
    };
  }, []); */

  const resetPrescreption = () => {
    setPrescreption([]);
  };

  const filterMedsPrescription = (_meds) => {
    return _meds.filter(
      (med) => !prescreption.find((p_med) => p_med.ID == med.ID)
    );
  };

  const filterMeds = (search) => {
    let exp = new RegExp(search);

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

  /* 
  useEffect(() => {
    // Fetch the list of pharmacies using Axios
    axios
      .get(`${API_URL}/list`)
      .then((response) => {
        setPharmacies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pharmacies:", error);
      });
  }, []);

  useEffect(() => {
    const search = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/searchMed?q=${searchText}`
        );
        setSearchResults(response.data);
        console.log("result");
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Delay the search to avoid making too many requests as the user types
    const delay = setTimeout(() => {
      if (searchText.length > 0) {
        search();
      } else {
        setSearchResults([]);
      }
    }, 300); // Adjust the delay time as needed

    return () => clearTimeout(delay);
  }, [searchText]);
 */
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
        <Button onPress={() => filterMeds("")} title="X" />
        <FontAwesome5 name="times" size={24} color="#4fb69a" />
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
              {prescreption.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <MaterialIcons name="shopping-cart" size={24} color="#313132" />
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
        <Text>{prescreption.length}</Text>
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
