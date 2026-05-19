import React from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { Text, TextInput, Button, SegmentedButtons } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemeContext } from "../../App";
import { getScreenTheme } from "../theme/appTheme";

const BLUE = "#2563EB";
const TEAL = "#0EA5A8";
const GREEN = "#16A34A";
const ORANGE = "#F97316";
const RED = "#EF4444";

export default function CreateTaskScreen({ navigation }) {
  const { isDarkMode } = React.useContext(ThemeContext);
  const theme = getScreenTheme(isDarkMode);

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
    priority === "High" ? RED : priority === "Medium" ? "#F59E0B" : GREEN;

  const statusColor =
    status === "Done" ? GREEN : status === "In Progress" ? TEAL : ORANGE;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={
          isDarkMode ? theme.headerCard : ["#F0FDFA", "#ECFEFF", "#F8FAFC"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.headerCard,
          {
            borderColor: theme.cardBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View style={styles.headerCircleOne} />
        <View style={styles.headerCircleTwo} />

        <View>
          <Text style={[styles.title, { color: theme.text }]}>Create Task</Text>

          <Text style={[styles.subtitle, { color: theme.subText }]}>
            Tạo công việc mới cho project
          </Text>
        </View>

        <View style={[styles.headerIcon, { backgroundColor: theme.softWhite }]}>
          <MaterialCommunityIcons
            name="clipboard-plus"
            size={42}
            color={TEAL}
          />
        </View>
      </LinearGradient>

      <LinearGradient
        colors={isDarkMode ? theme.whiteCard : ["#FFFFFF", "#F8FAFC"]}
        style={[
          styles.formCard,
          {
            borderColor: theme.cardBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Task Information
        </Text>

        <TextInput
          label="Task title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.surface }]}
          textColor={theme.text}
          outlineColor={theme.border}
          activeOutlineColor={TEAL}
          left={<TextInput.Icon icon="clipboard-text-outline" />}
        />

        <TextInput
          label="Project"
          value={project}
          onChangeText={setProject}
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.surface }]}
          textColor={theme.text}
          outlineColor={theme.border}
          activeOutlineColor={BLUE}
          left={<TextInput.Icon icon="folder-outline" />}
        />

        <TextInput
          label="Assignee"
          value={assignee}
          onChangeText={setAssignee}
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.surface }]}
          textColor={theme.text}
          outlineColor={theme.border}
          activeOutlineColor={TEAL}
          left={<TextInput.Icon icon="account-outline" />}
        />

        <TextInput
          label="Deadline"
          placeholder="VD: 25/05/2026"
          value={deadline}
          onChangeText={setDeadline}
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.surface }]}
          textColor={theme.text}
          outlineColor={theme.border}
          activeOutlineColor={BLUE}
          left={<TextInput.Icon icon="calendar-clock" />}
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={[styles.input, { backgroundColor: theme.surface }]}
          textColor={theme.text}
          outlineColor={theme.border}
          activeOutlineColor={TEAL}
          left={<TextInput.Icon icon="text-box-outline" />}
        />

        <Text style={[styles.label, { color: theme.text }]}>Priority</Text>

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

        <Text style={[styles.label, { color: theme.text }]}>Status</Text>

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
          colors={isDarkMode ? theme.tealCard : ["#F0FDFA", "#ECFEFF"]}
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
            <Text style={[styles.previewTitle, { color: theme.text }]}>
              {title.trim() || "Task Preview"}
            </Text>

            <Text style={[styles.previewSubtitle, { color: theme.subText }]}>
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
          buttonColor={BLUE}
          textColor="#FFFFFF"
          onPress={handleCreate}
          style={styles.createButton}
          contentStyle={styles.buttonContent}
        >
          Create Task
        </Button>

        <Button
          mode="text"
          textColor={TEAL}
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
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  headerCircleOne: {
    position: "absolute",
    right: -38,
    bottom: -42,
    width: 160,
    height: 130,
    borderRadius: 90,
    backgroundColor: "rgba(14,165,168,0.12)",
  },
  headerCircleTwo: {
    position: "absolute",
    left: -42,
    top: -50,
    width: 150,
    height: 120,
    borderRadius: 80,
    backgroundColor: "rgba(37,99,235,0.10)",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 6,
    maxWidth: 230,
  },
  headerIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
  },
  formCard: {
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 16,
  },
  input: {
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    fontWeight: "900",
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
  },
  previewSubtitle: {
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
