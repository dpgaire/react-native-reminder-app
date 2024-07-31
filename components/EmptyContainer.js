import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const EmptyContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../assets/icon.png")} // Add an appropriate image for your design
        style={styles.image}
      /> */}
      <Text style={styles.title}>No Reminders Found</Text>
      <Text style={styles.description}>
        It looks like you don’t have any reminders yet. Create one to get
        started!
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddReminder")}
      >
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    tintColor: "#b0bec5", // Optional: Adjust color of the image
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default EmptyContainer;
