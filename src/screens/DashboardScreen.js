import React from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { ThemeContext } from "../../App";
import { getScreenTheme } from "../theme/appTheme";
import { projects, tasks, notifications, user } from "../data/mockData";

function StatCard({
  title,
  value,
  icon,
  colors,
  iconColor,
  fullWidth = false,
  badge,
  onPress,
  theme,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.statWrapper, fullWidth && styles.statWrapperFull]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.statCard,
          fullWidth && styles.statCardFull,
          {
            borderColor: theme.cardBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View style={[styles.topAccent, { backgroundColor: iconColor }]} />
        <View style={styles.waveOne} />
        <View style={styles.waveTwo} />

        <View style={styles.statContent}>
          <View style={styles.iconShadow}>
            <View
              style={[styles.iconCircle, { backgroundColor: theme.softWhite }]}
            >
              <MaterialCommunityIcons name={icon} size={34} color={iconColor} />
            </View>
          </View>

          <View style={styles.statTextBox}>
            <Text style={[styles.statTitle, { color: theme.text }]}>
              {title}
            </Text>
            <Text style={[styles.statNumber, { color: iconColor }]}>
              {value}
            </Text>
          </View>

          {badge ? (
            <View style={[styles.badge, { backgroundColor: iconColor }]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ) : null}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function RecentProjectCard({ project, navigation, theme, isDarkMode }) {
  const progress = Number(project?.progress || 0);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("ProjectDetail", { projectId: project?.id })
      }
    >
      <LinearGradient
        colors={
          isDarkMode ? theme.purpleCard : ["#FAF5FF", "#EEF2FF", "#FDF4FF"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.projectCard,
          {
            borderColor: theme.cardBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View style={styles.projectCircleOne} />
        <View style={styles.projectCircleTwo} />

        <Text style={[styles.projectTitle, { color: theme.text }]}>
          {project?.name || "Task Management App"}
        </Text>

        <Text style={[styles.projectDescription, { color: theme.subText }]}>
          {project?.description || "Ứng dụng quản lý dự án và công việc nhóm."}
        </Text>

        <View style={styles.statusChip}>
          <MaterialCommunityIcons
            name="rocket-launch"
            size={20}
            color="#A855F7"
          />
          <Text style={styles.statusText}>
            {project?.status || "In Progress"}
          </Text>
        </View>

        <Text style={[styles.progressText, { color: theme.text }]}>
          Progress {progress}%
        </Text>

        <View style={styles.progressBackground}>
          <LinearGradient
            colors={["#A855F7", "#2563EB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>

        <View style={styles.projectFooter}>
          <View style={styles.memberIconBox}>
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color="#A855F7"
            />
          </View>

          <Text style={[styles.memberText, { color: theme.text }]}>
            Members: {project?.members || 0}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function TaskPreviewCard({ task, navigation, theme, isDarkMode }) {
  if (!task) return null;

  const priorityColor =
    task.priority === "High"
      ? "#EF4444"
      : task.priority === "Medium"
        ? "#F59E0B"
        : "#22C55E";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("TaskDetail", { taskId: task.id })}
    >
      <LinearGradient
        colors={isDarkMode ? theme.cyanCard : ["#F0FDFA", "#ECFEFF", "#F8FAFC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.taskPreviewCard,
          {
            borderColor: theme.cardBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View
          style={[styles.taskIconCircle, { backgroundColor: theme.softWhite }]}
        >
          <MaterialCommunityIcons
            name="clipboard-check-outline"
            size={30}
            color="#0891B2"
          />
        </View>

        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, { color: theme.text }]}>
            {task.title}
          </Text>
          <Text style={[styles.taskProject, { color: theme.subText }]}>
            {task.project}
          </Text>

          <View style={styles.taskMetaRow}>
            <View
              style={[styles.priorityDot, { backgroundColor: priorityColor }]}
            />
            <Text style={[styles.taskMeta, { color: theme.subText }]}>
              {task.priority}
            </Text>

            <MaterialCommunityIcons
              name="calendar-clock"
              size={16}
              color={theme.subText}
              style={{ marginLeft: 12 }}
            />
            <Text style={[styles.taskMeta, { color: theme.subText }]}>
              {task.deadline}
            </Text>
          </View>
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={28}
          color={theme.subText}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function DashboardScreen({ navigation }) {
  const { isDarkMode } = React.useContext(ThemeContext);
  const theme = getScreenTheme(isDarkMode);

  const doneTasks = tasks.filter((task) => task.status === "Done").length;
  const pendingTasks = tasks.filter((task) => task.status !== "Done").length;
  const unreadNotifications = notifications.filter((item) => !item.read).length;

  const recentProject = projects[0];
  const todayTask = tasks.find((task) => task.status !== "Done") || tasks[0];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.helloText, { color: theme.text }]}>
          Hello, {user?.name || "Ngô Minh"}
        </Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Quản lý dự án của bạn hôm nay
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Projects"
          value={projects.length}
          icon="briefcase-variant"
          colors={isDarkMode ? theme.blueCard : ["#F8FAFF", "#EAF2FF"]}
          iconColor="#2563EB"
          theme={theme}
          onPress={() => navigation.navigate("Projects")}
        />

        <StatCard
          title="Tasks"
          value={tasks.length}
          icon="format-list-checks"
          colors={isDarkMode ? theme.purpleCard : ["#FCF7FF", "#F3E8FF"]}
          iconColor="#7C3AED"
          theme={theme}
          onPress={() => navigation.navigate("Tasks")}
        />

        <StatCard
          title="Done"
          value={doneTasks}
          icon="check-bold"
          colors={isDarkMode ? theme.greenCard : ["#F0FDF4", "#DCFCE7"]}
          iconColor="#16A34A"
          theme={theme}
          onPress={() => navigation.navigate("Tasks")}
        />

        <StatCard
          title="Pending"
          value={pendingTasks}
          icon="timer-sand"
          colors={isDarkMode ? theme.orangeCard : ["#FFF7ED", "#FEF3C7"]}
          iconColor="#F97316"
          theme={theme}
          onPress={() => navigation.navigate("Tasks")}
        />

        <StatCard
          title="Unread"
          value={unreadNotifications}
          icon="email-outline"
          colors={isDarkMode ? theme.cyanCard : ["#ECFEFF", "#DFFBFF"]}
          iconColor="#0EA5A8"
          fullWidth
          badge={unreadNotifications}
          theme={theme}
          onPress={() => navigation.navigate("Notifications")}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Recent Project
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Projects")}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <RecentProjectCard
        project={recentProject}
        navigation={navigation}
        theme={theme}
        isDarkMode={isDarkMode}
      />

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          My Task
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("My Tasks")}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <TaskPreviewCard
        task={todayTask}
        navigation={navigation}
        theme={theme}
        isDarkMode={isDarkMode}
      />

      <View style={styles.quickActionRow}>
        <Button
          mode="contained"
          icon="plus"
          style={styles.actionButton}
          contentStyle={styles.actionButtonContent}
          onPress={() => navigation.navigate("CreateProject")}
        >
          Project
        </Button>

        <Button
          mode="contained-tonal"
          icon="plus-circle-outline"
          style={styles.actionButton}
          contentStyle={styles.actionButtonContent}
          onPress={() => navigation.navigate("CreateTask")}
        >
          Task
        </Button>
      </View>
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
  header: {
    marginBottom: 22,
  },
  helloText: {
    fontSize: 34,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 17,
    marginTop: 6,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statWrapper: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 22,
  },
  statWrapperFull: {
    width: "100%",
  },
  statCard: {
    minHeight: 125,
    borderRadius: 22,
    padding: 18,
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 5,
  },
  statCardFull: {
    minHeight: 112,
  },
  topAccent: {
    position: "absolute",
    top: 16,
    left: 18,
    width: 42,
    height: 5,
    borderRadius: 999,
  },
  waveOne: {
    position: "absolute",
    right: -35,
    bottom: -40,
    width: 145,
    height: 95,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.12)",
    transform: [{ rotate: "-22deg" }],
  },
  waveTwo: {
    position: "absolute",
    right: 20,
    bottom: -48,
    width: 120,
    height: 80,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.08)",
    transform: [{ rotate: "-18deg" }],
  },
  statContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  iconShadow: {
    shadowColor: "#475569",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  statTextBox: {
    marginLeft: 16,
    flex: 1,
  },
  statTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  statNumber: {
    fontSize: 42,
    fontWeight: "900",
    marginTop: 6,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: 6,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "900",
  },
  seeAllText: {
    color: "#2563EB",
    fontWeight: "800",
    fontSize: 15,
  },
  projectCard: {
    borderRadius: 28,
    padding: 22,
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 5,
  },
  projectCircleOne: {
    position: "absolute",
    right: -38,
    bottom: -30,
    width: 160,
    height: 120,
    borderRadius: 80,
    backgroundColor: "rgba(168,85,247,0.12)",
    transform: [{ rotate: "-20deg" }],
  },
  projectCircleTwo: {
    position: "absolute",
    right: 28,
    bottom: -52,
    width: 150,
    height: 95,
    borderRadius: 70,
    backgroundColor: "rgba(37,99,235,0.08)",
    transform: [{ rotate: "-12deg" }],
  },
  projectTitle: {
    fontSize: 28,
    fontWeight: "900",
  },
  projectDescription: {
    fontSize: 16,
    lineHeight: 23,
    marginTop: 10,
  },
  statusChip: {
    marginTop: 18,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(124,58,237,0.14)",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
  },
  statusText: {
    marginLeft: 8,
    color: "#A855F7",
    fontSize: 15,
    fontWeight: "800",
  },
  progressText: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "900",
  },
  progressBackground: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(148,163,184,0.25)",
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  projectFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  memberIconBox: {
    width: 44,
    height: 36,
    borderRadius: 16,
    backgroundColor: "rgba(124,58,237,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  memberText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "700",
  },
  taskPreviewCard: {
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  taskIconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
  },
  taskInfo: {
    flex: 1,
    marginLeft: 14,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: "900",
  },
  taskProject: {
    marginTop: 4,
  },
  taskMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  priorityDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 6,
  },
  taskMeta: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 4,
  },
  quickActionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 22,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
  },
  actionButtonContent: {
    paddingVertical: 6,
  },
});
