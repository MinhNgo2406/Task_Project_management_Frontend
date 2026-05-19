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

import { projects, tasks, user } from "../data/mockData";
import { hasPermission } from "../utils/permissions";

function InfoBox({ icon, label, value, color, colors }) {
  return (
    <LinearGradient colors={colors} style={styles.infoBox}>
      <MaterialCommunityIcons name={icon} size={28} color={color} />
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </LinearGradient>
  );
}

function ProjectTaskCard({ task, onPress }) {
  const statusColor =
    task.status === "Done"
      ? "#16A34A"
      : task.status === "In Progress"
        ? "#7C3AED"
        : "#F97316";

  const priorityColor =
    task.priority === "High"
      ? "#EF4444"
      : task.priority === "Medium"
        ? "#F59E0B"
        : "#22C55E";

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <LinearGradient
        colors={["#FFFFFF", "#F8FAFC", "#EEF2FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.taskCard}
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
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskSubtitle}>
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
          color="#94A3B8"
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function ProjectDetailScreen({ route, navigation }) {
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
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#FAF5FF", "#EEF2FF", "#F8FAFC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <View style={styles.circleOne} />
        <View style={styles.circleTwo} />

        <View style={styles.headerTop}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="briefcase-variant"
              size={42}
              color="#7C3AED"
            />
          </View>

          <View style={styles.headerTextBox}>
            <Text style={styles.title}>{project.name}</Text>
            <Text style={styles.description}>{project.description}</Text>
          </View>
        </View>

        <View style={styles.statusChip}>
          <MaterialCommunityIcons
            name="rocket-launch"
            size={20}
            color="#6D28D9"
          />
          <Text style={styles.statusText}>{project.status}</Text>
        </View>

        <Text style={styles.progressText}>Progress {project.progress}%</Text>

        <View style={styles.progressTrack}>
          <LinearGradient
            colors={["#A855F7", "#2563EB"]}
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
          color="#2563EB"
          colors={["#EFF6FF", "#DBEAFE"]}
        />

        <InfoBox
          icon="clipboard-list"
          label="Tasks"
          value={projectTasks.length}
          color="#7C3AED"
          colors={["#FAF5FF", "#F3E8FF"]}
        />
      </View>

      <View style={styles.infoRow}>
        <InfoBox
          icon="check-circle"
          label="Done"
          value={doneTasks}
          color="#16A34A"
          colors={["#F0FDF4", "#DCFCE7"]}
        />

        <InfoBox
          icon="timer-sand"
          label="Pending"
          value={pendingTasks}
          color="#F97316"
          colors={["#FFF7ED", "#FFEDD5"]}
        />
      </View>

      <LinearGradient
        colors={["#FFFFFF", "#F8FAFC"]}
        style={styles.deadlineCard}
      >
        <View style={styles.deadlineIcon}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={28}
            color="#0EA5A8"
          />
        </View>

        <View>
          <Text style={styles.deadlineLabel}>Deadline</Text>
          <Text style={styles.deadlineValue}>{project.deadline}</Text>
        </View>
      </LinearGradient>

      <View style={styles.actionRow}>
        <Button
          mode="contained"
          icon="pencil"
          style={styles.actionButton}
          contentStyle={styles.buttonContent}
          onPress={handleEditProject}
        >
          Edit
        </Button>

        <Button
          mode="contained-tonal"
          icon="delete-outline"
          style={styles.actionButton}
          contentStyle={styles.buttonContent}
          onPress={handleDeleteProject}
        >
          Delete
        </Button>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tasks in Project</Text>

        <TouchableOpacity onPress={() => navigation.navigate("CreateTask")}>
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {projectTasks.length === 0 ? (
        <LinearGradient
          colors={["#FFFFFF", "#F8FAFC"]}
          style={styles.emptyCard}
        >
          <MaterialCommunityIcons
            name="clipboard-text-off-outline"
            size={36}
            color="#94A3B8"
          />
          <Text style={styles.emptyText}>Chưa có task trong project này.</Text>
        </LinearGradient>
      ) : (
        projectTasks.map((task) => (
          <ProjectTaskCard
            key={task.id}
            task={task}
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
    backgroundColor: "#F8FAFC",
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
    borderColor: "rgba(255,255,255,0.9)",
  },
  circleOne: {
    position: "absolute",
    right: -42,
    bottom: -42,
    width: 170,
    height: 130,
    borderRadius: 90,
    backgroundColor: "rgba(124,58,237,0.12)",
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
    backgroundColor: "rgba(255,255,255,0.78)",
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
    color: "#020617",
  },
  description: {
    color: "#64748B",
    marginTop: 6,
    lineHeight: 21,
  },
  statusChip: {
    marginTop: 20,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(124,58,237,0.14)",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
  },
  statusText: {
    marginLeft: 8,
    color: "#6D28D9",
    fontWeight: "900",
  },
  progressText: {
    marginTop: 18,
    fontWeight: "900",
    color: "#020617",
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
  },
  infoBox: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    alignItems: "center",
    marginRight: 10,
  },
  infoValue: {
    fontSize: 26,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 6,
  },
  infoLabel: {
    color: "#64748B",
    fontWeight: "800",
  },
  deadlineCard: {
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
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
    color: "#64748B",
    fontWeight: "700",
  },
  deadlineValue: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 3,
  },
  actionRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    marginRight: 10,
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
    color: "#020617",
  },
  addText: {
    color: "#2563EB",
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
    borderColor: "rgba(255,255,255,0.9)",
    shadowColor: "#64748B",
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
    color: "#0F172A",
  },
  taskSubtitle: {
    color: "#64748B",
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
    color: "#64748B",
    fontWeight: "700",
  },
});
