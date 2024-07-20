import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AddReminderScreen from "../screens/AddReminderScreen";
import ReminderDetailsScreen from "../screens/ReminderDetailsScreen";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

const CenterTitle = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text
      onPress={() =>
        alert("Developed by Durga Gairhe. Appricate his contribution.")
      }
      style={{ fontSize: 18, fontWeight: "bold" }}
    >
      Remind Me!
    </Text>
  </View>
);

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => alert("Drawer feature is comming soon!")}
            >
              <Icon name="menu" size={25} style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          ),
          headerTitle: () => <CenterTitle />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("Search feature is comming soon!")}
            >
              <Icon name="search" size={25} style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen name="AddReminder" component={AddReminderScreen} />
      <Stack.Screen name="ReminderDetails" component={ReminderDetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
