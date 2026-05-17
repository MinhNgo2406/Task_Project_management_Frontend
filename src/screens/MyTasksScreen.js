import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import TaskCard from "../components/TaskCard";
import { tasks, user } from "../data/mockData";

export default function MyTasksScreen({ navigation }) {
  const myTasks = tasks.filter(
    (task) => task.assignee.toLowerCase() === "minh",
  );

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        My Tasks
      </Text>

      <Text style={styles.subtitle}>
        Những task đang được giao cho {user.name}
      </Text>

      {myTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onPress={() => navigation.navigate("TaskDetail", { taskId: task.id })}
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
  },
  subtitle: {
    color: "#64748B",
    marginTop: 4,
    marginBottom: 16,
  },
});
