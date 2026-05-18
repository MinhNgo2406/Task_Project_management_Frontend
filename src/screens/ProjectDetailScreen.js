import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Card, ProgressBar, Chip, List } from "react-native-paper";
import { projects, tasks } from "../data/mockData";

export default function ProjectDetailScreen({ route, navigation }) {
  const { projectId } = route.params;
  const project = projects.find((item) => item.id === projectId);

  const projectTasks = tasks.filter((task) => task.project === project.name);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {project.name}
          </Text>

          <Text style={styles.description}>{project.description}</Text>

          <Chip style={styles.chip}>{project.status}</Chip>

          <Text style={styles.label}>Progress: {project.progress}%</Text>
          <ProgressBar progress={project.progress / 100} />

          <Text style={styles.info}>Members: {project.members}</Text>
          <Text style={styles.info}>Deadline: {project.deadline}</Text>
        </Card.Content>
      </Card>

      <Text variant="titleLarge" style={styles.sectionTitle}>
        Tasks in Project
      </Text>

      {projectTasks.map((task) => (
        <List.Item
          key={task.id}
          title={task.title}
          description={`${task.status} • ${task.priority}`}
          left={(props) => (
            <List.Icon {...props} icon="checkbox-marked-circle-outline" />
          )}
          onPress={() => navigation.navigate("TaskDetail", { taskId: task.id })}
          style={styles.listItem}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "transparent",
  },
  card: {
    borderRadius: 16,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    marginVertical: 10,
    color: "#64748B",
  },
  chip: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
  },
  info: {
    marginTop: 10,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontWeight: "bold",
  },
  listItem: {
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    borderRadius: 14,
  },
});
