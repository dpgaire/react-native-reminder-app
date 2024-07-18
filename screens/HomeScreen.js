import React, { useEffect } from "react";
import { View, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteReminder,
  fetchRemindersFromStorage,
} from "../redux/remindersSlice";
import ReminderItem from "../components/ReminderItem";

const HomeScreen = ({ navigation }) => {
  const reminders = useSelector((state) => state.reminders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRemindersFromStorage());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button
        title="Add Reminder"
        onPress={() => navigation.navigate("AddReminder")}
      />
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReminderItem
            item={item}
            onEdit={() =>
              navigation.navigate("ReminderDetails", { id: item.id })
            }
            onDelete={() => dispatch(deleteReminder(item.id))}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;
