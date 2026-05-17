import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Avatar,
  Text,
  Card,
  List,
  Button,
  Divider,
  Chip,
} from "react-native-paper";

import { user, projects, tasks, notifications } from "../data/mockData";

export default function ProfileScreen() {
  const completedTasks = tasks.filter((task) => task.status === "Done").length;

  const pendingTasks = tasks.filter((task) => task.status !== "Done").length;

  const unreadNotifications = notifications.filter((item) => !item.read).length;

  return (
    <ScrollView style={styles.container}>
      {/* Avatar + User Info */}
      <Card style={styles.profileCard}>
        <Card.Content>
          <Avatar.Text size={90} label="NM" style={styles.avatar} />

          <Text variant="headlineSmall" style={styles.name}>
            {user.name}
          </Text>

          <Text style={styles.email}>{user.email}</Text>

          <Chip icon="shield-account" style={styles.roleChip}>
            {user.role}
          </Chip>
        </Card.Content>
      </Card>

      {/* Statistics */}
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Statistics
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <List.Item
            title="Total Projects"
            description={`${projects.length} projects`}
            left={(props) => <List.Icon {...props} icon="folder-multiple" />}
          />

          <Divider />

          <List.Item
            title="Total Tasks"
            description={`${tasks.length} tasks`}
            left={(props) => (
              <List.Icon {...props} icon="checkbox-marked-circle-outline" />
            )}
          />

          <Divider />

          <List.Item
            title="Completed Tasks"
            description={`${completedTasks} completed`}
            left={(props) => (
              <List.Icon {...props} icon="check-circle-outline" />
            )}
          />

          <Divider />

          <List.Item
            title="Pending Tasks"
            description={`${pendingTasks} pending`}
            left={(props) => <List.Icon {...props} icon="clock-outline" />}
          />

          <Divider />

          <List.Item
            title="Unread Notifications"
            description={`${unreadNotifications} unread`}
            left={(props) => <List.Icon {...props} icon="bell-badge-outline" />}
          />
        </Card.Content>
      </Card>

      {/* Workspace Info */}
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Workspace
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <List.Item
            title="Workspace Name"
            description="Project Management Workspace"
            left={(props) => <List.Icon {...props} icon="office-building" />}
          />

          <Divider />

          <List.Item
            title="Current Role"
            description={user.role}
            left={(props) => <List.Icon {...props} icon="account-badge" />}
          />

          <Divider />

          <List.Item
            title="Permission Level"
            description={
              user.role === "Admin"
                ? "Full Access"
                : user.role === "Manager"
                  ? "Manage Projects & Tasks"
                  : user.role === "Member"
                    ? "Manage Assigned Tasks"
                    : "View Only"
            }
            left={(props) => (
              <List.Icon {...props} icon="shield-check-outline" />
            )}
          />
        </Card.Content>
      </Card>

      {/* Settings */}
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Settings
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <List.Item
            title="Edit Profile"
            description="Update user information"
            left={(props) => (
              <List.Icon {...props} icon="account-edit-outline" />
            )}
          />

          <Divider />

          <List.Item
            title="Change Password"
            description="Update account password"
            left={(props) => <List.Icon {...props} icon="lock-reset" />}
          />

          <Divider />

          <List.Item
            title="Notification Settings"
            description="Manage notification preferences"
            left={(props) => <List.Icon {...props} icon="bell-cog-outline" />}
          />
        </Card.Content>
      </Card>

      {/* Logout */}
      <Button
        mode="contained"
        icon="logout"
        style={styles.logoutButton}
        onPress={() => alert("Logout frontend demo")}
      >
        Logout
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  profileCard: {
    borderRadius: 20,
    marginBottom: 20,
  },

  avatar: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 16,
    backgroundColor: "#2563EB",
  },

  name: {
    textAlign: "center",
    fontWeight: "bold",
  },

  email: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 6,
  },

  roleChip: {
    alignSelf: "center",
    marginTop: 14,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 8,
  },

  card: {
    borderRadius: 18,
    marginBottom: 20,
  },

  logoutButton: {
    marginBottom: 40,
    borderRadius: 14,
    paddingVertical: 6,
  },
});
