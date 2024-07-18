import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AddReminderScreen from "../screens/AddReminderScreen";
import ReminderDetailsScreen from "../screens/ReminderDetailsScreen";

const Stack = createStackNavigator();

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddReminder" component={AddReminderScreen} />
      <Stack.Screen name="ReminderDetails" component={ReminderDetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
