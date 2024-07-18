import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const ReminderItem = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  buttons: {
    flexDirection: "row",
    gap: 5,
  },
});

export default ReminderItem;
