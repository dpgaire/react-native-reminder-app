// toastConfig.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Define custom toast configuration
const toastConfig = {
  info: (props) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{props.text1}</Text>
      <Text style={styles.toastSubText}>{props.text2}</Text>
    </View>
  ),
  warning: (props) => (
    <View style={styles.warningToastContainer}>
      <Text style={styles.warningToastText}>{props.text1}</Text>
      <Text style={styles.warningToastSubText}>{props.text2}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 40, // Position at the bottom of the screen
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "90%", // Adjust as needed
  },
  toastText: {
    fontSize: 18, // Larger text size for main message
    color: "#fff",
    fontWeight: "bold",
  },
  toastSubText: {
    fontSize: 16, // Smaller text size for sub-message
    color: "#fff",
  },
  warningToastContainer: {
    backgroundColor: "#F44336", // Red background for warning
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 40, // Position at the bottom of the screen
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "90%", // Adjust as needed
  },
  warningToastText: {
    fontSize: 18, // Larger text size for warning message
    color: "#fff",
    fontWeight: "bold",
  },
  warningToastSubText: {
    fontSize: 16, // Smaller text size for sub-message
    color: "#fff",
  },
});

export default toastConfig;
