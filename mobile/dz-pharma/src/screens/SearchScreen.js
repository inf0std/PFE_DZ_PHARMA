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
} from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import PharmacyCard from "../components/PharmacyCard";
import axios from "axios";
import { API_URL } from "../../config";

const SearchScreen = () => {
  const { width, height } = Dimensions.get("window");

  const [pharmacies, setPharmacies] = useState([]);

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
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
          onChangeText={setSearchText}
          style={{ flex: 1, color: "#3d4fb8" }}
        />
        <FontAwesome5 name="times" size={24} color="#3d4fb8" />
      </View>
      {/* Your search implementation goes here */}

      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.denomination_commune_internationale}</Text>
              <Text>{item.code}</Text>
            </View>
          )}
        />
        {pharmacies?.map((pharmacy) => (
          <PharmacyCard key={pharmacy.pharmacie_id} pharmacy={pharmacy} />
        ))}
      </ScrollView>
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
