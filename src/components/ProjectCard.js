import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, ProgressBar, Chip, Button } from "react-native-paper";

export default function ProjectCard({ project, onPress }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          {project.name}
        </Text>

        <Text style={styles.description}>{project.description}</Text>

        <Chip style={styles.chip}>{project.status}</Chip>

        <Text style={styles.progressText}>Progress {project.progress}%</Text>

        <ProgressBar
          progress={project.progress / 100}
          style={styles.progressBar}
        />

        <Text style={styles.info}>Members: {project.members}</Text>

        <Text style={styles.info}>Deadline: {project.deadline}</Text>
      </Card.Content>

      <Card.Actions>
        <Button mode="contained" onPress={onPress}>
          View Detail
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 22,
    elevation: 3,
  },

  title: {
    fontWeight: "bold",
  },

  description: {
    marginTop: 10,
    marginBottom: 12,
    color: "#64748B",
  },

  chip: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },

  progressText: {
    marginBottom: 6,
    fontWeight: "600",
  },

  progressBar: {
    height: 10,
    borderRadius: 20,
  },

  info: {
    marginTop: 10,
  },
});
