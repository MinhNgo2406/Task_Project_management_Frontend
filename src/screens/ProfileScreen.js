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
  Switch,
} from "react-native-paper";

import { ThemeContext } from "../../App";
import { user, projects, tasks, notifications } from "../data/mockData";

export default function ProfileScreen() {
  const { isDarkMode, setIsDarkMode } = React.useContext(ThemeContext);

  const completedTasks = tasks.filter((task) => task.status === "Done").length;

  const pendingTasks = tasks.filter((task) => task.status !== "Done").length;

  const unreadNotifications = notifications.filter((item) => !item.read).length;

  return (
    <ScrollView style={styles.container}>
      {/* PROFILE */}
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

      {/* STATISTICS */}
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

      {/* WORKSPACE */}
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

      {/* SETTINGS */}
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Settings
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          {/* DARK MODE */}
          <List.Item
            title="Dark Mode"
            description={
              isDarkMode ? "Dark theme enabled" : "Light theme enabled"
            }
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={isDarkMode}
                onValueChange={() => setIsDarkMode(!isDarkMode)}
              />
            )}
          />

          <Divider />

          {/* EDIT PROFILE */}
          <List.Item
            title="Edit Profile"
            description="Update user information"
            left={(props) => (
              <List.Icon {...props} icon="account-edit-outline" />
            )}
          />

          <Divider />

          {/* CHANGE PASSWORD */}
          <List.Item
            title="Change Password"
            description="Update account password"
            left={(props) => <List.Icon {...props} icon="lock-reset" />}
          />

          <Divider />

          {/* NOTIFICATION SETTINGS */}
          <List.Item
            title="Notification Settings"
            description="Manage notification preferences"
            left={(props) => <List.Icon {...props} icon="bell-cog-outline" />}
          />
        </Card.Content>
      </Card>

      {/* LOGOUT */}
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
    padding: 16,
  },

  profileCard: {
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
  },

  avatar: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 16,
    backgroundColor: "#5B8DEF",
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
    elevation: 3,
  },

  logoutButton: {
    marginBottom: 40,
    borderRadius: 14,
    paddingVertical: 6,
  },
});
