import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, ProgressBar, Chip, Button } from "react-native-paper";

export default function ProjectCard({ project, onPress }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          {project.name}
        </Text>

        <Text variant="bodyMedium" style={styles.description}>
          {project.description}
        </Text>

        <Chip style={styles.chip}>{project.status}</Chip>

        <Text style={styles.progressText}>Progress: {project.progress}%</Text>
        <ProgressBar progress={project.progress / 100} />

        <Text style={styles.info}>Members: {project.members}</Text>
        <Text style={styles.info}>Deadline: {project.deadline}</Text>
      </Card.Content>

      <Card.Actions>
        <Button onPress={onPress}>View Detail</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
    borderRadius: 16,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    marginVertical: 8,
    color: "#64748B",
  },
  chip: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  progressText: {
    marginBottom: 6,
  },
  info: {
    marginTop: 8,
  },
});
