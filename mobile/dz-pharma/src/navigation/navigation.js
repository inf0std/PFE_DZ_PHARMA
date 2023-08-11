// StackNavigator.js

import { createStackNavigator } from "@react-navigation/stack";
import Screen1 from "../screens/Screen1"; // Replace 'Screen1' with your actual screen components
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";

import BottomTab from "./Tabnav";
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />

      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
