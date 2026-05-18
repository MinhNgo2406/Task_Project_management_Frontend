import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";

export default function CreateProjectScreen({ navigation }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [deadline, setDeadline] = React.useState("");

  const handleCreate = () => {
    alert("Project đã được tạo - frontend demo");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Create Project
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Project name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          <TextInput
            label="Deadline"
            value={deadline}
            onChangeText={setDeadline}
            mode="outlined"
            placeholder="25/05/2026"
            style={styles.input}
          />

          <Button mode="contained" onPress={handleCreate}>
            Create Project
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "transparent",
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
});
