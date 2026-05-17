import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Text,
  Card,
  Chip,
  Button,
  Divider,
  Snackbar,
  List,
  Checkbox,
  TextInput,
} from "react-native-paper";
import { tasks, user } from "../data/mockData";
import { hasPermission } from "../utils/permissions";

export default function TaskDetailScreen({ route }) {
  const { taskId } = route.params;
  const task = tasks.find((item) => item.id === taskId);

  const [visible, setVisible] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState(task.comments || []);
  const [subtasks, setSubtasks] = React.useState(task.subtasks || []);

  const handleMarkDone = () => {
    if (!hasPermission(user.role, "canEditTask")) {
      setVisible(true);
      return;
    }

    alert("Task đã được đánh dấu hoàn thành - frontend demo");
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        user: user.name,
        message: comment,
      },
    ]);

    setComment("");
  };

  const toggleSubtask = (id) => {
    setSubtasks(
      subtasks.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              {task.title}
            </Text>

            <Text style={styles.description}>{task.description}</Text>

            <Divider style={styles.divider} />

            <Text style={styles.info}>Project: {task.project}</Text>
            <Text style={styles.info}>Assignee: {task.assignee}</Text>
            <Text style={styles.info}>Deadline: {task.deadline}</Text>

            <Chip style={styles.chip}>Status: {task.status}</Chip>
            <Chip style={styles.chip}>Priority: {task.priority}</Chip>
          </Card.Content>

          {hasPermission(user.role, "canEditTask") && (
            <Card.Actions>
              <Button mode="contained" onPress={handleMarkDone}>
                Mark as Done
              </Button>
            </Card.Actions>
          )}
        </Card>

        <Text variant="titleLarge" style={styles.sectionTitle}>
          Subtasks
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            {subtasks.length === 0 ? (
              <Text style={styles.emptyText}>Chưa có subtask.</Text>
            ) : (
              subtasks.map((item) => (
                <List.Item
                  key={item.id}
                  title={item.title}
                  left={() => (
                    <Checkbox
                      status={item.done ? "checked" : "unchecked"}
                      onPress={() => toggleSubtask(item.id)}
                    />
                  )}
                />
              ))
            )}
          </Card.Content>
        </Card>

        <Text variant="titleLarge" style={styles.sectionTitle}>
          Comments
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            {comments.length === 0 ? (
              <Text style={styles.emptyText}>Chưa có comment.</Text>
            ) : (
              comments.map((item) => (
                <List.Item
                  key={item.id}
                  title={item.user}
                  description={item.message}
                  left={(props) => (
                    <List.Icon {...props} icon="comment-text-outline" />
                  )}
                />
              ))
            )}

            <TextInput
              label="Write comment..."
              value={comment}
              onChangeText={setComment}
              mode="outlined"
              style={styles.commentInput}
            />

            <Button mode="contained" onPress={handleAddComment}>
              Add Comment
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        Bạn không có quyền cập nhật task này.
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F8FAFC",
  },
  card: {
    borderRadius: 16,
    marginBottom: 18,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    marginTop: 12,
    color: "#64748B",
  },
  divider: {
    marginVertical: 16,
  },
  info: {
    marginTop: 8,
  },
  chip: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyText: {
    color: "#64748B",
  },
  commentInput: {
    marginTop: 12,
    marginBottom: 12,
  },
});
