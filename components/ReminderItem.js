import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ReminderItem = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={onEdit}
          style={[styles.iconButton, styles.editButton]}
        >
          <Icon name="pencil" size={20} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.iconButton, styles.deleteButton]}
        >
          <Icon name="trash" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
  },
  date: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  buttons: {
    flexDirection: "row",
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  deleteButton: {
    borderWidth: 2,
    borderColor: "#F44336",
  },
});

export default ReminderItem;
