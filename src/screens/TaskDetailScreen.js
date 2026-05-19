import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Text,
  Button,
  Checkbox,
  TextInput,
  Snackbar,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemeContext } from "../../App";
import { getScreenTheme } from "../theme/appTheme";
import { tasks, user } from "../data/mockData";
import { hasPermission } from "../utils/permissions";

const BLUE = "#2563EB";
const TEAL = "#0EA5A8";
const CYAN = "#06B6D4";
const GREEN = "#16A34A";
const ORANGE = "#F97316";
const RED = "#EF4444";

function DetailPill({ icon, label, value, color, theme, isDarkMode }) {
  return (
    <View
      style={[
        styles.detailPill,
        {
          backgroundColor: isDarkMode ? "#111827" : `${color}16`,
          borderColor: isDarkMode ? "#334155" : "transparent",
        },
      ]}
    >
      <MaterialCommunityIcons name={icon} size={20} color={color} />

      <View style={styles.detailPillText}>
        <Text style={[styles.detailLabel, { color: theme.subText }]}>
          {label}
        </Text>
        <Text style={[styles.detailValue, { color }]}>{value}</Text>
      </View>
    </View>
  );
}

function CommentCard({ item, theme, isDarkMode }) {
  return (
    <LinearGradient
      colors={isDarkMode ? theme.whiteCard : ["#FFFFFF", "#F8FAFC"]}
      style={[
        styles.commentCard,
        {
          borderColor: theme.cardBorder,
        },
      ]}
    >
      <View style={styles.commentAvatar}>
        <Text style={styles.commentAvatarText}>
          {item.user?.charAt(0)?.toUpperCase() || "U"}
        </Text>
      </View>

      <View style={styles.commentContent}>
        <Text style={[styles.commentUser, { color: theme.text }]}>
          {item.user}
        </Text>
        <Text style={[styles.commentMessage, { color: theme.subText }]}>
          {item.message}
        </Text>
      </View>

      <MaterialCommunityIcons
        name="heart-outline"
        size={22}
        color={theme.subText}
      />
    </LinearGradient>
  );
}

export default function TaskDetailScreen({ route }) {
  const { isDarkMode } = React.useContext(ThemeContext);
  const theme = getScreenTheme(isDarkMode);

  const { taskId } = route.params || {};
  const task = tasks.find((item) => item.id === taskId) || tasks[0];

  const [visible, setVisible] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState(task.comments || []);
  const [subtasks, setSubtasks] = React.useState(task.subtasks || []);

  const statusColor =
    task.status === "Done"
      ? GREEN
      : task.status === "In Progress"
        ? TEAL
        : ORANGE;

  const priorityColor =
    task.priority === "High"
      ? RED
      : task.priority === "Medium"
        ? "#F59E0B"
        : GREEN;

  const doneSubtasks = subtasks.filter((item) => item.done).length;
  const subtaskProgress =
    subtasks.length === 0
      ? 0
      : Math.round((doneSubtasks / subtasks.length) * 100);

  const handleMarkDone = () => {
    if (!hasPermission(user.role, "canEditTask")) {
      setVisible(true);
      return;
    }

    Alert.alert("Demo", "Task đã được đánh dấu hoàn thành - frontend demo");
  };

  const handleEditTask = () => {
    if (!hasPermission(user.role, "canEditTask")) {
      setVisible(true);
      return;
    }

    Alert.alert("Demo", "Edit Task frontend demo");
  };

  const handleDeleteTask = () => {
    if (!hasPermission(user.role, "canDeleteTask")) {
      setVisible(true);
      return;
    }

    Alert.alert("Demo", "Delete Task frontend demo");
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now().toString(),
        user: user.name,
        message: comment.trim(),
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
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={
            isDarkMode ? theme.tealCard : ["#F0FDFA", "#ECFEFF", "#F8FAFC"]
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
          <View style={styles.circleOne} />
          <View style={styles.circleTwo} />

          <View style={styles.headerTop}>
            <View
              style={[
                styles.headerIcon,
                { backgroundColor: `${statusColor}18` },
              ]}
            >
              <MaterialCommunityIcons
                name="clipboard-check-outline"
                size={42}
                color={statusColor}
              />
            </View>

            <View style={styles.headerTextBox}>
              <Text style={[styles.title, { color: theme.text }]}>
                {task.title}
              </Text>
              <Text style={[styles.description, { color: theme.subText }]}>
                {task.description}
              </Text>
            </View>
          </View>

          <View style={styles.tagRow}>
            <View
              style={[
                styles.statusChip,
                { backgroundColor: `${statusColor}18` },
              ]}
            >
              <Text style={[styles.statusText, { color: statusColor }]}>
                {task.status}
              </Text>
            </View>

            <View
              style={[
                styles.statusChip,
                { backgroundColor: `${priorityColor}18` },
              ]}
            >
              <Text style={[styles.statusText, { color: priorityColor }]}>
                {task.priority}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.detailGrid}>
          <DetailPill
            icon="folder-outline"
            label="Project"
            value={task.project}
            color={BLUE}
            theme={theme}
            isDarkMode={isDarkMode}
          />

          <DetailPill
            icon="account-outline"
            label="Assignee"
            value={task.assignee}
            color={TEAL}
            theme={theme}
            isDarkMode={isDarkMode}
          />

          <DetailPill
            icon="calendar-clock"
            label="Deadline"
            value={task.deadline}
            color={CYAN}
            theme={theme}
            isDarkMode={isDarkMode}
          />

          <DetailPill
            icon="flag-outline"
            label="Priority"
            value={task.priority}
            color={priorityColor}
            theme={theme}
            isDarkMode={isDarkMode}
          />
        </View>

        <View style={styles.actionRow}>
          <Button
            mode="contained"
            icon="check-bold"
            buttonColor={GREEN}
            textColor="#FFFFFF"
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            onPress={handleMarkDone}
          >
            Done
          </Button>

          <Button
            mode="contained"
            icon="pencil"
            buttonColor={BLUE}
            textColor="#FFFFFF"
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            onPress={handleEditTask}
          >
            Edit
          </Button>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.deleteButton,
              { backgroundColor: isDarkMode ? "#450A0A" : "#FEF2F2" },
            ]}
            onPress={handleDeleteTask}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color={RED}
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Subtasks
        </Text>

        <LinearGradient
          colors={isDarkMode ? theme.whiteCard : ["#FFFFFF", "#F8FAFC"]}
          style={[
            styles.subtaskBox,
            {
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.subtaskHeader}>
            <Text style={[styles.subtaskProgressText, { color: theme.text }]}>
              {doneSubtasks}/{subtasks.length} completed
            </Text>

            <Text style={styles.subtaskPercent}>{subtaskProgress}%</Text>
          </View>

          <View style={styles.progressTrack}>
            <LinearGradient
              colors={[GREEN, BLUE]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${subtaskProgress}%` }]}
            />
          </View>

          {subtasks.length === 0 ? (
            <Text style={[styles.emptyText, { color: theme.subText }]}>
              Chưa có subtask.
            </Text>
          ) : (
            subtasks.map((item) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item.id}
                style={[
                  styles.subtaskItem,
                  {
                    backgroundColor: isDarkMode ? "#111827" : "#F8FAFC",
                  },
                ]}
                onPress={() => toggleSubtask(item.id)}
              >
                <Checkbox
                  status={item.done ? "checked" : "unchecked"}
                  onPress={() => toggleSubtask(item.id)}
                />

                <Text
                  style={[
                    styles.subtaskTitle,
                    { color: item.done ? theme.subText : theme.text },
                    item.done && styles.subtaskDone,
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </LinearGradient>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Comments
        </Text>

        {comments.length === 0 ? (
          <LinearGradient
            colors={isDarkMode ? theme.whiteCard : ["#FFFFFF", "#F8FAFC"]}
            style={styles.emptyCommentBox}
          >
            <MaterialCommunityIcons
              name="comment-outline"
              size={36}
              color={theme.subText}
            />
            <Text style={[styles.emptyText, { color: theme.subText }]}>
              Chưa có comment.
            </Text>
          </LinearGradient>
        ) : (
          comments.map((item) => (
            <CommentCard
              key={item.id}
              item={item}
              theme={theme}
              isDarkMode={isDarkMode}
            />
          ))
        )}

        <LinearGradient
          colors={isDarkMode ? theme.whiteCard : ["#FFFFFF", "#F8FAFC"]}
          style={styles.addCommentBox}
        >
          <TextInput
            label="Add comment"
            value={comment}
            onChangeText={setComment}
            mode="outlined"
            multiline
            style={styles.commentInput}
            left={<TextInput.Icon icon="comment-plus-outline" />}
          />

          <Button
            mode="contained"
            icon="send"
            buttonColor={TEAL}
            textColor="#FFFFFF"
            onPress={handleAddComment}
            style={styles.sendButton}
            contentStyle={styles.buttonContent}
          >
            Send Comment
          </Button>
        </LinearGradient>
      </ScrollView>

      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        Bạn không có quyền thực hiện chức năng này.
      </Snackbar>
    </>
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
    borderRadius: 30,
    padding: 22,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  circleOne: {
    position: "absolute",
    right: -42,
    bottom: -42,
    width: 170,
    height: 130,
    borderRadius: 90,
    backgroundColor: "rgba(14,165,168,0.12)",
  },
  circleTwo: {
    position: "absolute",
    left: -42,
    top: -50,
    width: 150,
    height: 120,
    borderRadius: 80,
    backgroundColor: "rgba(37,99,235,0.1)",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextBox: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 27,
    fontWeight: "900",
  },
  description: {
    marginTop: 6,
    lineHeight: 21,
  },
  tagRow: {
    flexDirection: "row",
    marginTop: 18,
  },
  statusChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 10,
  },
  statusText: {
    fontWeight: "900",
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailPill: {
    width: "48%",
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  detailPillText: {
    flex: 1,
    marginLeft: 10,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  detailValue: {
    fontWeight: "900",
    marginTop: 2,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  deleteButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 18,
    marginBottom: 12,
  },
  subtaskBox: {
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
  },
  subtaskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtaskProgressText: {
    fontWeight: "900",
  },
  subtaskPercent: {
    fontWeight: "900",
    color: BLUE,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(148,163,184,0.24)",
    marginTop: 10,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  subtaskItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 6,
    marginTop: 8,
  },
  subtaskTitle: {
    flex: 1,
    fontWeight: "800",
  },
  subtaskDone: {
    textDecorationLine: "line-through",
  },
  emptyText: {
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
  },
  commentCard: {
    borderRadius: 22,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  commentAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: TEAL,
    alignItems: "center",
    justifyContent: "center",
  },
  commentAvatarText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 18,
  },
  commentContent: {
    flex: 1,
    marginLeft: 12,
  },
  commentUser: {
    fontWeight: "900",
  },
  commentMessage: {
    marginTop: 3,
    lineHeight: 20,
  },
  emptyCommentBox: {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  addCommentBox: {
    borderRadius: 24,
    padding: 16,
    marginTop: 8,
  },
  commentInput: {
    marginBottom: 12,
  },
  sendButton: {
    borderRadius: 16,
  },
});
