import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addReminder } from "../redux/remindersSlice";
import { v4 as uuidv4 } from "uuid";
import {
  requestPermissions,
  scheduleNotification,
} from "../notifications/notification";

const AddReminderScreen = ({ navigation = {} }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleAddReminder = async () => {
    dispatch(addReminder({ id: uuidv4(), title, date: date.toISOString() }));
    await scheduleNotification(title, "Reminder!", new Date(date));
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
    setDate(currentDate);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Reminder Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Button onPress={showDatepicker} title="Select Date and Time" />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        date={date}
        onConfirm={onDateChange}
        onCancel={hideDatepicker}
      />
      <View style={styles.addReminderButton}>
        <Button title="Add Reminder" onPress={handleAddReminder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "red",
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
  dateTimePicker: {
    marginTop: 10,
  },
  selectedDate: {
    marginBottom: 10,
  },
  addReminderButton: {
    marginTop: 10,
  },
});

export default AddReminderScreen;
