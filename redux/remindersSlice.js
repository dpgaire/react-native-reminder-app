import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Async thunk to fetch reminders from AsyncStorage
const fetchRemindersFromStorage = createAsyncThunk(
  "reminders/fetchFromStorage",
  async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("reminders");
      return jsonValue ? JSON.parse(jsonValue) : [];
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
      const newState = [...state, action.payload];
      saveReminders(newState);
      return newState;
    },
    updateReminder: (state, action) => {
      const index = state.findIndex(
        (reminder) => reminder.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
        saveReminders(state);
      }
    },
    deleteReminder: (state, action) => {
      const newState = state.filter(
        (reminder) => reminder.id !== action.payload
      );
      saveReminders(newState);
      return newState;
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
