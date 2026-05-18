import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Text,
  Searchbar,
  SegmentedButtons,
  Button,
  Snackbar,
} from "react-native-paper";
import TaskCard from "../components/TaskCard";
import { tasks, user } from "../data/mockData";
import { hasPermission } from "../utils/permissions";

export default function TasksScreen({ navigation }) {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("All");
  const [visible, setVisible] = React.useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || task.status === status;
    return matchSearch && matchStatus;
  });

  const handleCreateTask = () => {
    if (!hasPermission(user.role, "canCreateTask")) {
      setVisible(true);
      return;
    }

    navigation.navigate("CreateTask");
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Tasks
        </Text>

        <Text style={styles.roleText}>Current role: {user.role}</Text>

        {hasPermission(user.role, "canCreateTask") && (
          <Button
            mode="contained"
            icon="plus"
            onPress={handleCreateTask}
            style={styles.button}
          >
            Create Task
          </Button>
        )}

        <Searchbar
          placeholder="Search task..."
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        <SegmentedButtons
          value={status}
          onValueChange={setStatus}
          buttons={[
            { value: "All", label: "All" },
            { value: "Todo", label: "Todo" },
            { value: "In Progress", label: "Doing" },
            { value: "Done", label: "Done" },
          ]}
          style={styles.segment}
        />

        <View style={styles.list}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onPress={() =>
                navigation.navigate("TaskDetail", { taskId: task.id })
              }
            />
          ))}
        </View>
      </ScrollView>

      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        Bạn không có quyền thực hiện chức năng này.
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  roleText: {
    marginBottom: 12,
    color: "#64748B",
  },
  button: {
    marginBottom: 14,
  },
  search: {
    marginBottom: 14,
  },
  segment: {
    marginBottom: 16,
  },
  list: {
    marginBottom: 30,
  },
});
