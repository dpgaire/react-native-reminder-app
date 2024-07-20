import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { updateReminder } from "../redux/remindersSlice";
import { scheduleNotification } from "../notifications/notification";

const ReminderDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const reminder = useSelector((state) =>
    state.reminders.find((r) => r.id === id)
  );
  const [title, setTitle] = useState(reminder?.title || "");
  const [description, setDescription] = useState(reminder?.description || "");
  const [date, setDate] = useState(new Date(reminder?.date || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateReminder = async () => {
    if (title.trim() === "" || description.trim() === "") {
      Alert.alert(
        "Validation Error",
        "Please enter both title and description."
      );
      return;
    }
    dispatch(
      updateReminder({ id, title, description, date: date.toISOString() })
    );
    await scheduleNotification(title, description, new Date(date));
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
      <TextInput
        style={styles.input}
        placeholder="Enter reminder title"
        value={title}
        onChangeText={setTitle}
        autoFocus
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter reminder description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
        <Icon name="calendar" size={24} color="#fff" />
        <Text style={styles.dateButtonText}>
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        date={date}
        onConfirm={onDateChange}
        onCancel={hideDatepicker}
      />
      <TouchableOpacity
        style={styles.updateReminderButton}
        onPress={handleUpdateReminder}
      >
        <Text style={styles.updateReminderButtonText}>Update Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  descriptionInput: {
    height: 80,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  updateReminderButton: {
    backgroundColor: "#28A745",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  updateReminderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ReminderDetailsScreen;
