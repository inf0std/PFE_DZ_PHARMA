// StackNavigator.js

import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screens/CartScreen"; // Replace 'CartScreen' with your actual screen components
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Editprofile from "../screens/Editprofile";
import BottomTab from "./Tabnav";
import PhamaList from "../screens/PharmaList";
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
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
      {/*
      <Stack.Screen
        name="PhamaList"
        component={PhamaList}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Editprofile"
        component={Editprofile}
        options={{ headerShown: false }}
      />
      */}
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
