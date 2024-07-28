import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteReminder,
  fetchRemindersFromStorage,
} from "../redux/remindersSlice";
import ReminderItem from "../components/ReminderItem";
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const reminders = useSelector((state) => state.reminders);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);

  useEffect(() => {
    dispatch(fetchRemindersFromStorage());
  }, [dispatch, navigation]);

  const handleDelete = () => {
    dispatch(deleteReminder(selectedReminder.id));
    setModalVisible(false);
    setSelectedReminder(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AddReminder")}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
      {reminders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You don't have any reminders.</Text>
          <TouchableOpacity
            style={styles.addReminderLink}
            onPress={() => navigation.navigate("AddReminder")}
          >
            <Text style={styles.addReminderLinkText}>Click to Add.</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReminderItem
              item={item}
              onEdit={() =>
                navigation.navigate("ReminderDetails", { id: item.id })
              }
              onDelete={() => {
                setSelectedReminder(item);
                setModalVisible(true);
              }}
            />
          )}
        />
      )}

      {modalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Confirm Delete</Text>
              <Text style={styles.modalMessage}>
                Are you sure you want to delete this reminder?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.deleteButton]}
                  onPress={handleDelete}
                >
                  <Text style={styles.modalButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: "relative",
  },
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 30,
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 70,
    right: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 10,
  },
  emptyContainer: {
    display: "flex",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
  },
  addReminderLinkText: {
    fontWeight: "bold",
    color: "#682FBF",
    textDecorationLine: "underline",
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  deleteButton: {
    backgroundColor: "#F44336",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HomeScreen;
