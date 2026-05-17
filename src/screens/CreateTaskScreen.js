import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Card,
  SegmentedButtons,
} from "react-native-paper";

export default function CreateTaskScreen({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [project, setProject] = React.useState("");
  const [assignee, setAssignee] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [priority, setPriority] = React.useState("Medium");

  const handleCreate = () => {
    alert("Task đã được tạo - frontend demo");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Create Task
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Task title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Project"
            value={project}
            onChangeText={setProject}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Assignee"
            value={assignee}
            onChangeText={setAssignee}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Deadline"
            value={deadline}
            onChangeText={setDeadline}
            mode="outlined"
            placeholder="22/05/2026"
            style={styles.input}
          />

          <Text style={styles.label}>Priority</Text>

          <SegmentedButtons
            value={priority}
            onValueChange={setPriority}
            buttons={[
              { value: "Low", label: "Low" },
              { value: "Medium", label: "Medium" },
              { value: "High", label: "High" },
            ]}
            style={styles.segment}
          />

          <Button mode="contained" onPress={handleCreate}>
            Create Task
          </Button>
        </Card.Content>
      </Card>
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
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
  },
  input: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  segment: {
    marginBottom: 16,
  },
});
