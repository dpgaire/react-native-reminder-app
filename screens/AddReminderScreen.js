import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { addReminder } from "../redux/remindersSlice";
import { v4 as uuidv4 } from "uuid";
import {
  requestPermissions,
  scheduleNotification,
} from "../notifications/notification";

const AddReminderScreen = ({ navigation = {} }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleAddReminder = async () => {
    if (title.trim() === "" || description.trim() === "") {
      Alert.alert(
        "Validation Error",
        "Please enter both title and description."
      );
      return;
    }
    dispatch(
      addReminder({
        id: uuidv4(),
        title,
        description,
        date: date.toISOString(),
      })
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
    setDate(currentDate);
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        autoFocus
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
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
        style={styles.addReminderButton}
        onPress={handleAddReminder}
      >
        <Text style={styles.addReminderButtonText}>Add Reminder</Text>
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
    // textAlignVertical: "top",
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
  addReminderButton: {
    backgroundColor: "#28A745",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  addReminderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddReminderScreen;
