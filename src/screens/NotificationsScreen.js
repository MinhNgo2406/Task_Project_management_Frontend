import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, List, Button } from "react-native-paper";
import { notifications as defaultNotifications } from "../data/mockData";

export default function NotificationsScreen() {
  const [notifications, setNotifications] =
    React.useState(defaultNotifications);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((item) => ({
        ...item,
        read: true,
      })),
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Notifications
      </Text>

      <Button mode="contained" onPress={markAllAsRead} style={styles.button}>
        Mark all as read
      </Button>

      {notifications.map((item) => (
        <List.Item
          key={item.id}
          title={item.title}
          description={item.message}
          left={(props) => (
            <List.Icon
              {...props}
              icon={item.read ? "bell-outline" : "bell-badge-outline"}
            />
          )}
          style={[styles.item, !item.read && styles.unread]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    marginBottom: 16,
  },
  item: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginBottom: 10,
  },
  unread: {
    borderWidth: 1,
    borderColor: "#2563EB",
  },
});
