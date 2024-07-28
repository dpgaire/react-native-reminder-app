import React, { useState, useEffect } from "react";
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
  const [errors, setErrors] = useState({ title: "", description: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure date picker shows the correct initial date
    setDate(new Date(reminder?.date || Date.now()));
  }, [reminder?.date]);

  const handleUpdateReminder = async () => {
    const newErrors = { title: "", description: "" };
    let hasError = false;

    if (title.trim() === "") {
      newErrors.title = "Title is required.";
      hasError = true;
    }

    if (description.trim() === "") {
      newErrors.description = "Description is required.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    dispatch(
      updateReminder({ id, title, description, date: date.toISOString() })
    );
    await scheduleNotification(title, description, new Date(date));
    navigation.goBack();
  };

  const handleInputChange = (field, value) => {
    if (field === "title") {
      setTitle(value);
      if (value.trim() !== "") {
        setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
      }
    } else if (field === "description") {
      setDescription(value);
      if (value.trim() !== "") {
        setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
      }
    }
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
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.title ? styles.inputError : null]}
          placeholder="Enter reminder title"
          value={title}
          onChangeText={(text) => handleInputChange("title", text)}
          autoFocus
        />
        {errors.title ? (
          <Text style={styles.errorText}>{errors.title}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            styles.descriptionInput,
            errors.description ? styles.inputError : null,
          ]}
          placeholder="Enter reminder description"
          value={description}
          onChangeText={(text) => handleInputChange("description", text)}
          multiline
        />
        {errors.description ? (
          <Text style={styles.errorText}>{errors.description}</Text>
        ) : null}
      </View>

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
  inputContainer: {
    marginBottom: 10, // Adjust space between fields and error messages
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#F44336", // Red border for error state
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
  errorText: {
    color: "#F44336", // Red color for error text
    fontSize: 14,
    marginTop: 5, // Space between input field and error message
  },
});

export default ReminderDetailsScreen;
