import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const ShimmerPlaceholder = ({ style }) => {
  const translateX = useRef(new Animated.Value(-5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 5,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [translateX]);

  return (
    <View style={style}>
      <Animated.View
        style={[
          styles.shimmerEffect,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const ReminderItemSkeleton = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.info}>
        <ShimmerPlaceholder style={styles.skeletonTitle} />
        <ShimmerPlaceholder style={styles.skeletonDescription} />
        <ShimmerPlaceholder style={styles.skeletonDate} />
      </View>
      <View style={styles.buttons}>
        <ShimmerPlaceholder style={[styles.iconButton, styles.editButton]} />
        <ShimmerPlaceholder style={[styles.iconButton, styles.deleteButton]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
  },
  info: {
    flex: 1,
  },
  skeletonTitle: {
    height: 20,
    width: "80%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonDescription: {
    height: 14,
    width: "60%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonDate: {
    height: 14,
    width: "40%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  buttons: {
    flexDirection: "row",
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: "#e0e0e0",
  },
  editButton: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  deleteButton: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  shimmerEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    // Add a shimmer gradient background
    background:
      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(240,240,240,0.8) 50%, rgba(255,255,255,0) 100%)",
    opacity: 0.8,
  },
});

export default ReminderItemSkeleton;
