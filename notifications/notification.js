import * as Notifications from "expo-notifications";

// Request permissions
export const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access notifications was denied");
  }
};

// Schedule a notification with actions to add extra time
export const scheduleNotification = async (title, body, date) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      categoryIdentifier: "reminder", // Custom category for actions
    },
    trigger: date,
  });
};

// Configure notification actions
Notifications.setNotificationCategoryAsync("reminder", [
  {
    identifier: "add_5m",
    buttonTitle: "Add 5 min",
    options: {
      opensAppToForeground: true,
      destructive: false,
    },
  },
  {
    identifier: "add_10m",
    buttonTitle: "Add 10 min",
    options: {
      opensAppToForeground: true,
      destructive: false,
    },
  },
]);

// Handle notification responses
export const handleNotificationResponse = async (response) => {
  const { actionIdentifier, notification } = response;

  if (actionIdentifier === "add_5m") {
    const newDate = new Date(
      notification.request.content.trigger.seconds * 1000 + 5 * 60 * 1000
    ); // Add 5 minutes
    await scheduleNotification(
      notification.request.content.title,
      notification.request.content.body,
      newDate
    );
  } else if (actionIdentifier === "add_10m") {
    const newDate = new Date(
      notification.request.content.trigger.seconds * 1000 + 10 * 60 * 1000
    ); // Add 10 minutes
    await scheduleNotification(
      notification.request.content.title,
      notification.request.content.body,
      newDate
    );
  }
};

// Set up notification handling
Notifications.addNotificationResponseReceivedListener(
  handleNotificationResponse
);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
