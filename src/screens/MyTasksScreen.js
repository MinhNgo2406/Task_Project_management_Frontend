import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemeContext } from "../../App";
import { getScreenTheme } from "../theme/appTheme";
import { tasks, user } from "../data/mockData";

const BLUE = "#2563EB";
const TEAL = "#0EA5A8";
const GREEN = "#16A34A";
const ORANGE = "#F97316";

function MyTaskCard({ task, onPress, theme, isDarkMode }) {
  const statusColor =
    task.status === "Done"
      ? GREEN
      : task.status === "In Progress"
        ? TEAL
        : ORANGE;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <LinearGradient
        colors={isDarkMode ? theme.cyanCard : ["#F0FDFA", "#ECFEFF", "#F8FAFC"]}
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
        <View style={[styles.accent, { backgroundColor: statusColor }]} />

        <View style={[styles.iconBox, { backgroundColor: theme.softWhite }]}>
          <MaterialCommunityIcons
            name="account-check"
            size={32}
            color={statusColor}
          />
        </View>

        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, { color: theme.text }]}>
            {task.title}
          </Text>

          <Text style={[styles.taskProject, { color: theme.subText }]}>
            {task.project}
          </Text>

          <View style={styles.metaRow}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={17}
              color={theme.subText}
            />
            <Text style={[styles.metaText, { color: theme.subText }]}>
              {task.deadline}
            </Text>

            <View
              style={[
                styles.statusPill,
                { backgroundColor: `${statusColor}18` },
              ]}
            >
              <Text style={[styles.statusText, { color: statusColor }]}>
                {task.status}
              </Text>
            </View>
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

export default function MyTasksScreen({ navigation }) {
  const { isDarkMode } = React.useContext(ThemeContext);
  const theme = getScreenTheme(isDarkMode);

  const myTasks = tasks.filter(
    (task) => task.assignee.toLowerCase() === "minh",
  );

  const doneCount = myTasks.filter((task) => task.status === "Done").length;
  const doingCount = myTasks.length - doneCount;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={
          isDarkMode ? theme.headerCard : ["#ECFEFF", "#EFF6FF", "#F8FAFC"]
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
        <View>
          <Text style={[styles.title, { color: theme.text }]}>My Tasks</Text>

          <Text style={[styles.subtitle, { color: theme.subText }]}>
            Những task đang được giao cho {user.name}
          </Text>
        </View>

        <View style={[styles.headerIcon, { backgroundColor: theme.softWhite }]}>
          <MaterialCommunityIcons name="account-check" size={42} color={TEAL} />
        </View>
      </LinearGradient>

      <View style={styles.statRow}>
        <LinearGradient
          colors={isDarkMode ? theme.blueCard : ["#EFF6FF", "#DBEAFE"]}
          style={styles.statCard}
        >
          <MaterialCommunityIcons
            name="clipboard-list"
            size={28}
            color={BLUE}
          />
          <Text style={[styles.statNumber, { color: theme.text }]}>
            {myTasks.length}
          </Text>
          <Text style={[styles.statLabel, { color: theme.subText }]}>
            Total
          </Text>
        </LinearGradient>

        <LinearGradient
          colors={isDarkMode ? theme.greenCard : ["#F0FDF4", "#DCFCE7"]}
          style={styles.statCard}
        >
          <MaterialCommunityIcons name="check-circle" size={28} color={GREEN} />
          <Text style={[styles.statNumber, { color: theme.text }]}>
            {doneCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.subText }]}>Done</Text>
        </LinearGradient>

        <LinearGradient
          colors={isDarkMode ? theme.orangeCard : ["#FFF7ED", "#FEF3C7"]}
          style={styles.statCard}
        >
          <MaterialCommunityIcons name="timer-sand" size={28} color={ORANGE} />
          <Text style={[styles.statNumber, { color: theme.text }]}>
            {doingCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.subText }]}>
            Doing
          </Text>
        </LinearGradient>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Task List
      </Text>

      {myTasks.map((task) => (
        <MyTaskCard
          key={task.id}
          task={task}
          theme={theme}
          isDarkMode={isDarkMode}
          onPress={() => navigation.navigate("TaskDetail", { taskId: task.id })}
        />
      ))}
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
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  title: {
    fontSize: 34,
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
  statRow: {
    flexDirection: "row",
    marginBottom: 22,
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 22,
    padding: 14,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "900",
    marginTop: 6,
  },
  statLabel: {
    fontWeight: "800",
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 14,
  },
  taskCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  accent: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 7,
    height: "100%",
  },
  iconBox: {
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
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  metaText: {
    marginLeft: 5,
    fontWeight: "700",
  },
  statusPill: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  statusText: {
    fontWeight: "900",
    fontSize: 12,
  },
});
