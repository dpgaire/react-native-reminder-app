import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainNavigator from "./navigation/MainNavigator";
import "react-native-get-random-values";

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
