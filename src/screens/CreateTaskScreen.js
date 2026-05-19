import React from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { Text, TextInput, Button, SegmentedButtons } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CreateTaskScreen({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [project, setProject] = React.useState("");
  const [assignee, setAssignee] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState("Medium");
  const [status, setStatus] = React.useState("Todo");

  const handleCreate = () => {
    if (
      !title.trim() ||
      !project.trim() ||
      !assignee.trim() ||
      !deadline.trim()
    ) {
      Alert.alert(
        "Thiếu thông tin",
        "Vui lòng nhập title, project, assignee và deadline.",
      );
      return;
    }

    Alert.alert("Thành công", "Task đã được tạo - frontend demo", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const priorityColor =
    priority === "High"
      ? "#EF4444"
      : priority === "Medium"
        ? "#F59E0B"
        : "#22C55E";

  const statusColor =
    status === "Done"
      ? "#16A34A"
      : status === "In Progress"
        ? "#7C3AED"
        : "#F97316";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#FCF7FF", "#EEF2FF", "#F8FAFC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <View>
          <Text style={styles.title}>Create Task</Text>
          <Text style={styles.subtitle}>Tạo công việc mới cho project</Text>
        </View>

        <View style={styles.headerIcon}>
          <MaterialCommunityIcons
            name="clipboard-plus"
            size={42}
            color="#7C3AED"
          />
        </View>
      </LinearGradient>

      <LinearGradient colors={["#FFFFFF", "#F8FAFC"]} style={styles.formCard}>
        <Text style={styles.sectionTitle}>Task Information</Text>

        <TextInput
          label="Task title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="clipboard-text-outline" />}
        />

        <TextInput
          label="Project"
          value={project}
          onChangeText={setProject}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="folder-outline" />}
        />

        <TextInput
          label="Assignee"
          value={assignee}
          onChangeText={setAssignee}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="account-outline" />}
        />

        <TextInput
          label="Deadline"
          placeholder="VD: 25/05/2026"
          value={deadline}
          onChangeText={setDeadline}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="calendar-clock" />}
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
          left={<TextInput.Icon icon="text-box-outline" />}
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

        <Text style={styles.label}>Status</Text>

        <SegmentedButtons
          value={status}
          onValueChange={setStatus}
          buttons={[
            { value: "Todo", label: "Todo" },
            { value: "In Progress", label: "Doing" },
            { value: "Done", label: "Done" },
          ]}
          style={styles.segment}
        />

        <LinearGradient
          colors={["#F0FDFA", "#ECFEFF"]}
          style={styles.previewBox}
        >
          <View
            style={[
              styles.previewIcon,
              { backgroundColor: `${statusColor}18` },
            ]}
          >
            <MaterialCommunityIcons
              name="clipboard-check-outline"
              size={30}
              color={statusColor}
            />
          </View>

          <View style={styles.previewTextBox}>
            <Text style={styles.previewTitle}>
              {title.trim() || "Task Preview"}
            </Text>

            <Text style={styles.previewSubtitle}>
              {project.trim() || "Project name"} •{" "}
              {assignee.trim() || "Assignee"}
            </Text>

            <View style={styles.previewChipRow}>
              <View
                style={[
                  styles.previewChip,
                  { backgroundColor: `${statusColor}18` },
                ]}
              >
                <Text style={[styles.previewChipText, { color: statusColor }]}>
                  {status}
                </Text>
              </View>

              <View
                style={[
                  styles.previewChip,
                  { backgroundColor: `${priorityColor}18` },
                ]}
              >
                <Text
                  style={[styles.previewChipText, { color: priorityColor }]}
                >
                  {priority}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <Button
          mode="contained"
          icon="plus"
          onPress={handleCreate}
          style={styles.createButton}
          contentStyle={styles.buttonContent}
        >
          Create Task
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 34,
  },
  headerCard: {
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#020617",
  },
  subtitle: {
    color: "#64748B",
    fontSize: 16,
    marginTop: 6,
  },
  headerIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "rgba(255,255,255,0.78)",
    alignItems: "center",
    justifyContent: "center",
  },
  formCard: {
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#020617",
    marginBottom: 16,
  },
  input: {
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 15,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 10,
  },
  segment: {
    marginBottom: 16,
  },
  previewBox: {
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  previewIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
  },
  previewTextBox: {
    flex: 1,
    marginLeft: 14,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },
  previewSubtitle: {
    color: "#64748B",
    marginTop: 4,
  },
  previewChipRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  previewChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginRight: 8,
  },
  previewChipText: {
    fontSize: 12,
    fontWeight: "900",
  },
  createButton: {
    borderRadius: 16,
  },
  buttonContent: {
    paddingVertical: 7,
  },
  cancelButton: {
    marginTop: 8,
  },
});
