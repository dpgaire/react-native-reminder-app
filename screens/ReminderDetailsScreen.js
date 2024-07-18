import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { updateReminder } from "../redux/remindersSlice";

const ReminderDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const reminder = useSelector((state) =>
    state.reminders.find((r) => r.id === id)
  );
  const [title, setTitle] = useState(reminder?.title || "");
  const [date, setDate] = useState(new Date(reminder?.date || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateReminder = () => {
    dispatch(updateReminder({ id, title, date: date.toISOString() }));
    navigation.goBack();
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const hideDatepicker = () => {
    setShowDatePicker(false);
  };

  const onDateChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Reminders</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Button onPress={showDatepicker} title="Select Date and Time" />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        date={date}
        onConfirm={onDateChange}
        onCancel={hideDatepicker}
      />
      <View style={styles.updateReminderButton}>
        <Button title="Update Reminder" onPress={handleUpdateReminder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  selectedDateBtn: {
    marginTop: 15,
  },
  updateReminderButton: {
    marginTop: 10,
  },
});

export default ReminderDetailsScreen;
