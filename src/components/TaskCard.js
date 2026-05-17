import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Chip, Button } from "react-native-paper";

export default function TaskCard({ task, onPress }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          {task.title}
        </Text>

        <Text style={styles.text}>Project: {task.project}</Text>
        <Text style={styles.text}>Assignee: {task.assignee}</Text>
        <Text style={styles.text}>Deadline: {task.deadline}</Text>

        <Chip style={styles.chip}>{task.status}</Chip>
        <Chip style={styles.chip}>Priority: {task.priority}</Chip>
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
    marginBottom: 8,
  },
  text: {
    marginTop: 4,
  },
  chip: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
});
