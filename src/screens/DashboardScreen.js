import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";
import { projects, tasks, notifications, user } from "../data/mockData";

export default function DashboardScreen({ navigation }) {
  const doneTasks = tasks.filter((task) => task.status === "Done").length;
  const pendingTasks = tasks.filter((task) => task.status !== "Done").length;
  const unreadNotifications = notifications.filter((item) => !item.read).length;

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Hello, {user.name}
      </Text>

      <Text style={styles.subtitle}>Quản lý dự án của bạn hôm nay</Text>

      <View style={styles.statsRow}>
        <StatCard title="Projects" value={projects.length} />
        <StatCard title="Tasks" value={tasks.length} />
      </View>

      <View style={styles.statsRow}>
        <StatCard title="Done" value={doneTasks} />
        <StatCard title="Pending" value={pendingTasks} />
      </View>

      <View style={styles.statsRow}>
        <StatCard title="Unread" value={unreadNotifications} />
      </View>

      <Text variant="titleLarge" style={styles.sectionTitle}>
        Recent Project
      </Text>

      <ProjectCard
        project={projects[0]}
        onPress={() =>
          navigation.navigate("ProjectDetail", { projectId: projects[0].id })
        }
      />

      <Text variant="titleLarge" style={styles.sectionTitle}>
        My Task
      </Text>

      <TaskCard
        task={tasks[1]}
        onPress={() =>
          navigation.navigate("TaskDetail", { taskId: tasks[1].id })
        }
      />

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Frontend chức năng chính</Text>
          <Text style={styles.text}>• Dashboard tổng quan</Text>
          <Text style={styles.text}>• Danh sách project</Text>
          <Text style={styles.text}>• Chi tiết project</Text>
          <Text style={styles.text}>• Danh sách task</Text>
          <Text style={styles.text}>• Chi tiết task</Text>
          <Text style={styles.text}>• Notification</Text>
          <Text style={styles.text}>• Profile user</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate("Projects")}>
            Go to Projects
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  subtitle: {
    marginBottom: 20,
    color: "#64748B",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontWeight: "bold",
  },

  card: {
    borderRadius: 20,
    marginBottom: 18,
    elevation: 3,
  },

  text: {
    marginTop: 6,
  },
});
