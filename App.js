import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainNavigator from "./navigation/MainNavigator";
import "react-native-get-random-values";
import Toast from "react-native-toast-message";
import { SafeAreaView, StyleSheet } from "react-native";
import toastConfig from "./toastConfig";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <MainNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
