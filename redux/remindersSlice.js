import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

// Function to sort reminders by date
const sortRemindersByDate = (reminders) => {
  return [...reminders].sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Function to get remaining time
const getRemainingTime = (date) => {
  const now = new Date();
  const dueDate = new Date(date);
  const difference = dueDate - now;

  if (difference <= 0) return "Reminder has passed";

  const millisecondsInMinute = 1000 * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;

  const days = Math.floor(difference / millisecondsInDay);
  const hours = Math.floor(
    (difference % millisecondsInDay) / millisecondsInHour
  );
  const minutes = Math.floor(
    (difference % millisecondsInHour) / millisecondsInMinute
  );

  let timeString = "";
  if (days > 0) timeString += `${days} day${days > 1 ? "s" : ""} `;
  if (hours > 0 || days > 0)
    timeString += `${hours} hour${hours > 1 ? "s" : ""} `;
  timeString += `${minutes} minute${minutes > 1 ? "s" : ""}`;

  return timeString;
};

// Async thunk to fetch reminders from AsyncStorage
const fetchRemindersFromStorage = createAsyncThunk(
  "reminders/fetchFromStorage",
  async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("reminders");
      const reminders = jsonValue ? JSON.parse(jsonValue) : [];
      return sortRemindersByDate(reminders);
    } catch (error) {
      console.error("Error retrieving reminders:", error);
      return [];
    }
  }
);

// Function to save reminders to AsyncStorage
const saveReminders = async (reminders) => {
  try {
    await AsyncStorage.setItem("reminders", JSON.stringify(reminders));
  } catch (e) {
    console.error(e);
  }
};

const remindersSlice = createSlice({
  name: "reminders",
  initialState: [],
  reducers: {
    addReminder: (state, action) => {
      const newState = sortRemindersByDate([...state, action.payload]);
      saveReminders(newState);
      Toast.show({
        type: "info",
        position: "top",
        text1: "Reminder Added",
        text2: `Time remaining: ${getRemainingTime(action.payload.date)}`,
        visibilityTime: 3000,
      });
      return newState;
    },
    updateReminder: (state, action) => {
      const index = state.findIndex(
        (reminder) => reminder.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
        const newState = sortRemindersByDate(state);
        console.log("new state in update", newState);
        Toast.show({
          type: "info",
          position: "top",
          text1: "Reminder Updated",
          text2: `Time remaining: ${getRemainingTime(action.payload.date)}`,
          visibilityTime: 4000,
        });
        saveReminders(newState);
      }
    },
    deleteReminder: (state, action) => {
      const newState = state.filter(
        (reminder) => reminder.id !== action.payload
      );
      Toast.show({
        type: "warning",
        position: "top",
        text1: "Reminder Deleted",
        text2: `Successfully Deleted.`,
        visibilityTime: 4000,
      });
      saveReminders(sortRemindersByDate(newState)); // Sort reminders after deletion

      return sortRemindersByDate(newState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRemindersFromStorage.fulfilled, (state, action) => {
      return action.payload; // Update state with fetched reminders
    });
  },
});

export const { addReminder, updateReminder, deleteReminder } =
  remindersSlice.actions;
export const remindersReducer = remindersSlice.reducer;
export { fetchRemindersFromStorage };
