import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemeContext } from "../../App";
import { getScreenTheme } from "../theme/appTheme";
import { projects, tasks, user } from "../data/mockData";
import { hasPermission } from "../utils/permissions";

const BLUE = "#2563EB";
const TEAL = "#0EA5A8";
const CYAN = "#06B6D4";
const GREEN = "#16A34A";
const ORANGE = "#F97316";
const RED = "#EF4444";

function InfoBox({ icon, label, value, color, colors, theme }) {
  return (
    <LinearGradient colors={colors} style={styles.infoBox}>
      <MaterialCommunityIcons name={icon} size={28} color={color} />
      <Text style={[styles.infoValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.infoLabel, { color: theme.subText }]}>{label}</Text>
    </LinearGradient>
  );
}

function ProjectTaskCard({ task, onPress, theme, isDarkMode }) {
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

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <LinearGradient
        colors={
          isDarkMode ? theme.whiteCard : ["#FFFFFF", "#F8FAFC", "#ECFEFF"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.taskCard,
          {
            borderColor: theme.cardBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View style={[styles.taskAccent, { backgroundColor: statusColor }]} />

        <View
          style={[styles.taskIconBox, { backgroundColor: `${statusColor}18` }]}
        >
          <MaterialCommunityIcons
            name="clipboard-check-outline"
            size={30}
            color={statusColor}
          />
        </View>

        <View style={styles.taskContent}>
          <Text style={[styles.taskTitle, { color: theme.text }]}>
            {task.title}
          </Text>

          <Text style={[styles.taskSubtitle, { color: theme.subText }]}>
            {task.assignee} • {task.deadline}
          </Text>

          <View style={styles.chipRow}>
            <View
              style={[
                styles.smallChip,
                { backgroundColor: `${statusColor}18` },
              ]}
            >
              <Text style={[styles.smallChipText, { color: statusColor }]}>
                {task.status}
              </Text>
            </View>

            <View
              style={[
                styles.smallChip,
                { backgroundColor: `${priorityColor}18` },
              ]}
            >
              <Text style={[styles.smallChipText, { color: priorityColor }]}>
                {task.priority}
              </Text>
            </View>
          </View>
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={26}
          color={theme.subText}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function ProjectDetailScreen({ route, navigation }) {
  const { isDarkMode } = React.useContext(ThemeContext);
  const theme = getScreenTheme(isDarkMode);

  const { projectId } = route.params || {};
  const project = projects.find((item) => item.id === projectId) || projects[0];

  const projectTasks = tasks.filter((task) => task.project === project.name);
  const doneTasks = projectTasks.filter(
    (task) => task.status === "Done",
  ).length;
  const pendingTasks = projectTasks.length - doneTasks;

  const handleEditProject = () => {
    if (!hasPermission(user.role, "canEditProject")) {
      Alert.alert("Không có quyền", "Bạn không có quyền sửa project.");
      return;
    }

    Alert.alert("Demo", "Edit Project frontend demo");
  };

  const handleDeleteProject = () => {
    if (!hasPermission(user.role, "canDeleteProject")) {
      Alert.alert("Không có quyền", "Bạn không có quyền xóa project.");
      return;
    }

    Alert.alert("Demo", "Delete Project frontend demo");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={isDarkMode ? theme.tealCard : ["#ECFEFF", "#EFF6FF", "#F8FAFC"]}
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
            style={[styles.headerIcon, { backgroundColor: theme.softWhite }]}
          >
            <MaterialCommunityIcons
              name="briefcase-variant"
              size={42}
              color={TEAL}
            />
          </View>

          <View style={styles.headerTextBox}>
            <Text style={[styles.title, { color: theme.text }]}>
              {project.name}
            </Text>

            <Text style={[styles.description, { color: theme.subText }]}>
              {project.description}
            </Text>
          </View>
        </View>

        <View style={styles.statusChip}>
          <MaterialCommunityIcons name="rocket-launch" size={20} color={CYAN} />
          <Text style={styles.statusText}>{project.status}</Text>
        </View>

        <Text style={[styles.progressText, { color: theme.text }]}>
          Progress {project.progress}%
        </Text>

        <View style={styles.progressTrack}>
          <LinearGradient
            colors={[CYAN, BLUE]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${project.progress}%` }]}
          />
        </View>
      </LinearGradient>

      <View style={styles.infoRow}>
        <InfoBox
          icon="account-group"
          label="Members"
          value={project.members}
          color={BLUE}
          colors={isDarkMode ? theme.blueCard : ["#EFF6FF", "#DBEAFE"]}
          theme={theme}
        />

        <InfoBox
          icon="clipboard-list"
          label="Tasks"
          value={projectTasks.length}
          color={TEAL}
          colors={isDarkMode ? theme.tealCard : ["#F0FDFA", "#CCFBF1"]}
          theme={theme}
        />
      </View>

      <View style={styles.infoRow}>
        <InfoBox
          icon="check-circle"
          label="Done"
          value={doneTasks}
          color={GREEN}
          colors={isDarkMode ? theme.greenCard : ["#F0FDF4", "#DCFCE7"]}
          theme={theme}
        />

        <InfoBox
          icon="timer-sand"
          label="Pending"
          value={pendingTasks}
          color={ORANGE}
          colors={isDarkMode ? theme.orangeCard : ["#FFF7ED", "#FEF3C7"]}
          theme={theme}
        />
      </View>

      <LinearGradient
        colors={isDarkMode ? theme.whiteCard : ["#FFFFFF", "#F8FAFC"]}
        style={[
          styles.deadlineCard,
          {
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <View style={styles.deadlineIcon}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={28}
            color={TEAL}
          />
        </View>

        <View>
          <Text style={[styles.deadlineLabel, { color: theme.subText }]}>
            Deadline
          </Text>
          <Text style={[styles.deadlineValue, { color: theme.text }]}>
            {project.deadline}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.actionRow}>
        <Button
          mode="contained"
          icon="pencil"
          buttonColor={BLUE}
          textColor="#FFFFFF"
          style={styles.actionButton}
          contentStyle={styles.buttonContent}
          onPress={handleEditProject}
        >
          Edit
        </Button>

        <Button
          mode="contained"
          icon="delete-outline"
          buttonColor={isDarkMode ? "#450A0A" : "#FEE2E2"}
          textColor={isDarkMode ? "#FCA5A5" : RED}
          style={styles.actionButton}
          contentStyle={styles.buttonContent}
          onPress={handleDeleteProject}
        >
          Delete
        </Button>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Tasks in Project
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("CreateTask")}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {projectTasks.length === 0 ? (
        <LinearGradient
          colors={isDarkMode ? theme.whiteCard : ["#FFFFFF", "#F8FAFC"]}
          style={styles.emptyCard}
        >
          <MaterialCommunityIcons
            name="clipboard-text-off-outline"
            size={36}
            color={theme.subText}
          />
          <Text style={[styles.emptyText, { color: theme.subText }]}>
            Chưa có task trong project này.
          </Text>
        </LinearGradient>
      ) : (
        projectTasks.map((task) => (
          <ProjectTaskCard
            key={task.id}
            task={task}
            theme={theme}
            isDarkMode={isDarkMode}
            onPress={() =>
              navigation.navigate("TaskDetail", { taskId: task.id })
            }
          />
        ))
      )}
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
    left: -45,
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
    fontSize: 28,
    fontWeight: "900",
  },
  description: {
    marginTop: 6,
    lineHeight: 21,
  },
  statusChip: {
    marginTop: 20,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(14,165,168,0.14)",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
  },
  statusText: {
    marginLeft: 8,
    color: TEAL,
    fontWeight: "900",
  },
  progressText: {
    marginTop: 18,
    fontWeight: "900",
  },
  progressTrack: {
    height: 11,
    borderRadius: 999,
    backgroundColor: "rgba(148,163,184,0.25)",
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 10,
  },
  infoBox: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    alignItems: "center",
  },
  infoValue: {
    fontSize: 26,
    fontWeight: "900",
    marginTop: 6,
  },
  infoLabel: {
    fontWeight: "800",
  },
  deadlineCard: {
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
  },
  deadlineIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(14,165,168,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  deadlineLabel: {
    fontWeight: "700",
  },
  deadlineValue: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 3,
  },
  actionRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
  },
  addText: {
    color: BLUE,
    fontWeight: "900",
    fontSize: 16,
  },
  taskCard: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.11,
    shadowRadius: 12,
    elevation: 3,
  },
  taskAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 7,
    height: "100%",
  },
  taskIconBox: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
  },
  taskContent: {
    flex: 1,
    marginLeft: 14,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: "900",
  },
  taskSubtitle: {
    marginTop: 4,
  },
  chipRow: {
    flexDirection: "row",
    marginTop: 9,
  },
  smallChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginRight: 8,
  },
  smallChipText: {
    fontSize: 12,
    fontWeight: "900",
  },
  emptyCard: {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    marginTop: 8,
    fontWeight: "700",
  },
});
