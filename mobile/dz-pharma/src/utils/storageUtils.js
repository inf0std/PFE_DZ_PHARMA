// storageUtils.js

import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserIdFromStorage = async () => {
  try {
    const userIdString = await AsyncStorage.getItem("userId");
    if (userIdString !== null) {
      const userId = parseInt(userIdString);
      return userId;
    }
  } catch (error) {
    console.log("Error retrieving user ID from AsyncStorage:", error);
  }

  return null; // Return null if user ID is not found or an error occurs
};

export default getUserIdFromStorage;
