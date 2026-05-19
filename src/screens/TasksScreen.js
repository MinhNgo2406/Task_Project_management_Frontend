import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import {
  Text,
  Searchbar,
  SegmentedButtons,
  Button,
  Snackbar,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemeContext } from "../../App";
import { getScreenTheme } from "../theme/appTheme";
import { tasks, user } from "../data/mockData";
import { hasPermission } from "../utils/permissions";

function TaskColorCard({ task, onPress, theme, isDarkMode }) {
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
        colors={
          isDarkMode ? theme.whiteCard : ["#FFFFFF", "#F8FAFC", "#EEF2FF"]
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

        <View style={styles.taskTop}>
          <View
            style={[
              styles.taskIconBox,
              { backgroundColor: `${statusColor}18` },
            ]}
          >
            <MaterialCommunityIcons
              name="clipboard-check-outline"
              size={32}
              color={statusColor}
            />
          </View>

          <View style={styles.taskContent}>
            <Text style={[styles.taskTitle, { color: theme.text }]}>
              {task.title}
            </Text>

            <View style={styles.projectRow}>
              <MaterialCommunityIcons
                name="folder-outline"
                size={17}
                color={theme.subText}
              />
              <Text style={[styles.taskProject, { color: theme.subText }]}>
                {task.project}
              </Text>
            </View>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={theme.subText}
          />
        </View>

        <View style={styles.infoRow}>
          <View
            style={[
              styles.infoPill,
              {
                backgroundColor: isDarkMode
                  ? "#111827"
                  : "rgba(255,255,255,0.82)",
              },
            ]}
          >
            <MaterialCommunityIcons
              name="account-outline"
              size={17}
              color={theme.subText}
            />
            <Text style={[styles.infoText, { color: theme.subText }]}>
              {task.assignee}
            </Text>
          </View>

          <View
            style={[
              styles.infoPill,
              {
                backgroundColor: isDarkMode
                  ? "#111827"
                  : "rgba(255,255,255,0.82)",
              },
            ]}
          >
            <MaterialCommunityIcons
              name="calendar-clock"
              size={17}
              color={theme.subText}
            />
            <Text style={[styles.infoText, { color: theme.subText }]}>
              {task.deadline}
            </Text>
          </View>
        </View>

        <View style={styles.chipRow}>
          <View style={[styles.chip, { backgroundColor: `${statusColor}18` }]}>
            <MaterialCommunityIcons
              name={
                task.status === "Done"
                  ? "check-circle"
                  : task.status === "In Progress"
                    ? "progress-clock"
                    : "timer-sand"
              }
              size={16}
              color={statusColor}
            />
            <Text style={[styles.chipText, { color: statusColor }]}>
              {task.status}
            </Text>
          </View>

          <View
            style={[styles.chip, { backgroundColor: `${priorityColor}18` }]}
          >
            <MaterialCommunityIcons
              name="flag-outline"
              size={16}
              color={priorityColor}
            />
            <Text style={[styles.chipText, { color: priorityColor }]}>
              {task.priority}
            </Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
          <LinearGradient
            colors={[statusColor, "#6366F1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.detailButton}
          >
            <Text style={styles.detailButtonText}>View Detail</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
              color="#FFFFFF"
            />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function TasksScreen({ navigation }) {
  const { isDarkMode } = React.useContext(ThemeContext);
  const theme = getScreenTheme(isDarkMode);

  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("All");
  const [visible, setVisible] = React.useState(false);

  const doneCount = tasks.filter((task) => task.status === "Done").length;
  const doingCount = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const todoCount = tasks.filter((task) => task.status === "Todo").length;

  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.project.toLowerCase().includes(search.toLowerCase());

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
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={
            isDarkMode ? theme.headerCard : ["#FCF7FF", "#EEF2FF", "#F8FAFC"]
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
            <Text style={[styles.title, { color: theme.text }]}>Tasks</Text>
            <Text style={[styles.subtitle, { color: theme.subText }]}>
              Theo dõi công việc của team
            </Text>

            <View style={styles.rolePill}>
              <MaterialCommunityIcons
                name="shield-check"
                size={18}
                color="#7C3AED"
              />
              <Text style={styles.roleText}>Current role: {user.role}</Text>
            </View>
          </View>

          <View
            style={[styles.headerIcon, { backgroundColor: theme.softWhite }]}
          >
            <MaterialCommunityIcons
              name="format-list-checks"
              size={42}
              color="#7C3AED"
            />
          </View>
        </LinearGradient>

        <View style={styles.statRow}>
          <LinearGradient
            colors={isDarkMode ? theme.blueCard : ["#EFF6FF", "#DBEAFE"]}
            style={styles.statBox}
          >
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={28}
              color="#2563EB"
            />
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {tasks.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.subText }]}>
              All
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={isDarkMode ? theme.orangeCard : ["#FFF7ED", "#FFEDD5"]}
            style={styles.statBox}
          >
            <MaterialCommunityIcons
              name="timer-sand"
              size={28}
              color="#F97316"
            />
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {todoCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.subText }]}>
              Todo
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={isDarkMode ? theme.purpleCard : ["#FAF5FF", "#F3E8FF"]}
            style={styles.statBox}
          >
            <MaterialCommunityIcons
              name="progress-clock"
              size={28}
              color="#7C3AED"
            />
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {doingCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.subText }]}>
              Doing
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={isDarkMode ? theme.greenCard : ["#F0FDF4", "#DCFCE7"]}
            style={styles.statBox}
          >
            <MaterialCommunityIcons
              name="check-circle"
              size={28}
              color="#16A34A"
            />
            <Text style={[styles.statNumber, { color: theme.text }]}>
              {doneCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.subText }]}>
              Done
            </Text>
          </LinearGradient>
        </View>

        <Button
          mode="contained"
          icon="plus"
          onPress={handleCreateTask}
          style={styles.createButton}
          contentStyle={styles.buttonContent}
        >
          Create Task
        </Button>

        <Searchbar
          placeholder="Search task..."
          value={search}
          onChangeText={setSearch}
          style={[
            styles.search,
            {
              backgroundColor: theme.surface,
            },
          ]}
          inputStyle={{
            color: theme.text,
          }}
          placeholderTextColor={theme.subText}
          iconColor={isDarkMode ? "#C084FC" : "#7C3AED"}
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

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Task List
          </Text>
          <Text style={[styles.totalText, { color: theme.subText }]}>
            {filteredTasks.length} tasks
          </Text>
        </View>

        {filteredTasks.map((task) => (
          <TaskColorCard
            key={task.id}
            task={task}
            theme={theme}
            isDarkMode={isDarkMode}
            onPress={() =>
              navigation.navigate("TaskDetail", { taskId: task.id })
            }
          />
        ))}
      </ScrollView>

      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        Bạn không có quyền tạo task.
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },
  headerCircleOne: {
    position: "absolute",
    right: -38,
    bottom: -42,
    width: 160,
    height: 130,
    borderRadius: 90,
    backgroundColor: "rgba(124,58,237,0.12)",
  },
  headerCircleTwo: {
    position: "absolute",
    left: -42,
    top: -50,
    width: 150,
    height: 120,
    borderRadius: 80,
    backgroundColor: "rgba(37,99,235,0.1)",
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 6,
  },
  rolePill: {
    marginTop: 14,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(124,58,237,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  roleText: {
    marginLeft: 6,
    color: "#7C3AED",
    fontWeight: "800",
  },
  headerIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
  },
  statRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "900",
    marginTop: 5,
  },
  statLabel: {
    fontWeight: "800",
    fontSize: 12,
  },
  createButton: {
    borderRadius: 18,
    marginBottom: 14,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  search: {
    borderRadius: 22,
    marginBottom: 14,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  segment: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "900",
  },
  totalText: {
    fontWeight: "800",
  },
  taskCard: {
    borderRadius: 26,
    padding: 18,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 4,
  },
  taskAccent: {
    position: "absolute",
    top: 16,
    left: 18,
    width: 46,
    height: 5,
    borderRadius: 999,
  },
  taskTop: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  taskIconBox: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  taskContent: {
    flex: 1,
    marginLeft: 14,
  },
  taskTitle: {
    fontSize: 19,
    fontWeight: "900",
  },
  projectRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  taskProject: {
    marginLeft: 5,
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 16,
    flexWrap: "wrap",
  },
  infoPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 5,
    fontWeight: "800",
  },
  chipRow: {
    flexDirection: "row",
    marginTop: 6,
    flexWrap: "wrap",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontWeight: "900",
    marginLeft: 5,
  },
  detailButton: {
    marginTop: 8,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 18,
  },
  detailButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
    marginRight: 8,
  },
});
