// App.js

import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/navigation";
import { store, persistor } from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
