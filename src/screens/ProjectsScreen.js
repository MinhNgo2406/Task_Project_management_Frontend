import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Searchbar, Button, Snackbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemeContext } from "../../App";
import { getScreenTheme } from "../theme/appTheme";
import { projects, user } from "../data/mockData";
import { hasPermission } from "../utils/permissions";

const BLUE = "#2563EB";
const TEAL = "#0EA5A8";
const GREEN = "#16A34A";
const ORANGE = "#F97316";

function ProjectCardColor({ project, index, onPress, theme, isDarkMode }) {
  const lightColors = [
    ["#EFF6FF", "#DBEAFE"],
    ["#F0FDFA", "#CCFBF1"],
    ["#F0FDF4", "#DCFCE7"],
    ["#FFF7ED", "#FEF3C7"],
  ];

  const darkColors = [
    theme.blueCard,
    theme.tealCard,
    theme.greenCard,
    theme.orangeCard,
  ];

  const iconColors = [BLUE, TEAL, GREEN, ORANGE];

  const colors = isDarkMode
    ? darkColors[index % darkColors.length]
    : lightColors[index % lightColors.length];

  const iconColor = iconColors[index % iconColors.length];

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <LinearGradient
        colors={colors}
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
        <View style={[styles.topAccent, { backgroundColor: iconColor }]} />
        <View style={styles.waveOne} />
        <View style={styles.waveTwo} />

        <View style={styles.projectTop}>
          <View
            style={[styles.iconCircle, { backgroundColor: theme.softWhite }]}
          >
            <MaterialCommunityIcons
              name="briefcase-variant"
              size={34}
              color={iconColor}
            />
          </View>

          <View style={styles.projectInfo}>
            <Text style={[styles.projectTitle, { color: theme.text }]}>
              {project.name}
            </Text>

            <Text style={[styles.projectDescription, { color: theme.subText }]}>
              {project.description}
            </Text>
          </View>
        </View>

        <View style={styles.chipRow}>
          <View
            style={[styles.statusChip, { backgroundColor: `${iconColor}20` }]}
          >
            <MaterialCommunityIcons
              name="rocket-launch"
              size={18}
              color={iconColor}
            />
            <Text style={[styles.statusText, { color: iconColor }]}>
              {project.status}
            </Text>
          </View>

          <View
            style={[
              styles.memberBox,
              {
                backgroundColor: isDarkMode
                  ? "#111827"
                  : "rgba(255,255,255,0.7)",
              },
            ]}
          >
            <MaterialCommunityIcons
              name="account-group"
              size={18}
              color={theme.subText}
            />
            <Text style={[styles.memberText, { color: theme.subText }]}>
              {project.members}
            </Text>
          </View>
        </View>

        <Text style={[styles.progressLabel, { color: theme.text }]}>
          Progress {project.progress}%
        </Text>

        <View style={styles.progressTrack}>
          <LinearGradient
            colors={[iconColor, BLUE]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${project.progress}%` }]}
          />
        </View>

        <View style={styles.deadlineRow}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={18}
            color={theme.subText}
          />
          <Text style={[styles.deadlineText, { color: theme.subText }]}>
            Deadline: {project.deadline}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function ProjectsScreen({ navigation }) {
  const { isDarkMode } = React.useContext(ThemeContext);
  const theme = getScreenTheme(isDarkMode);

  const [search, setSearch] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreateProject = () => {
    if (!hasPermission(user.role, "canCreateProject")) {
      setVisible(true);
      return;
    }

    navigation.navigate("CreateProject");
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
            isDarkMode ? theme.headerCard : ["#EFF6FF", "#ECFEFF", "#F8FAFC"]
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
            <Text style={[styles.title, { color: theme.text }]}>Projects</Text>

            <Text style={[styles.subtitle, { color: theme.subText }]}>
              Quản lý tất cả dự án của bạn
            </Text>

            <View style={styles.rolePill}>
              <MaterialCommunityIcons
                name="shield-account"
                size={18}
                color={BLUE}
              />
              <Text style={styles.roleText}>Current role: {user.role}</Text>
            </View>
          </View>

          <View
            style={[styles.headerIcon, { backgroundColor: theme.softWhite }]}
          >
            <MaterialCommunityIcons
              name="folder-multiple"
              size={42}
              color={BLUE}
            />
          </View>
        </LinearGradient>

        <Searchbar
          placeholder="Tìm project..."
          value={search}
          onChangeText={setSearch}
          style={[styles.search, { backgroundColor: theme.surface }]}
          inputStyle={{ color: theme.text }}
          placeholderTextColor={theme.subText}
          iconColor={BLUE}
        />

        <Button
          mode="contained"
          icon="plus"
          buttonColor={BLUE}
          textColor="#FFFFFF"
          onPress={handleCreateProject}
          style={styles.createButton}
          contentStyle={styles.buttonContent}
        >
          Create Project
        </Button>

        {filteredProjects.map((project, index) => (
          <ProjectCardColor
            key={project.id}
            project={project}
            index={index}
            theme={theme}
            isDarkMode={isDarkMode}
            onPress={() =>
              navigation.navigate("ProjectDetail", { projectId: project.id })
            }
          />
        ))}
      </ScrollView>

      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        Bạn không có quyền tạo project.
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
    backgroundColor: "rgba(37,99,235,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  roleText: {
    marginLeft: 6,
    color: BLUE,
    fontWeight: "800",
  },
  headerIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    borderRadius: 18,
    marginBottom: 14,
  },
  createButton: {
    borderRadius: 16,
    marginBottom: 18,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  projectCard: {
    borderRadius: 26,
    padding: 20,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 5,
  },
  topAccent: {
    position: "absolute",
    top: 16,
    left: 20,
    width: 46,
    height: 5,
    borderRadius: 999,
  },
  waveOne: {
    position: "absolute",
    right: -42,
    bottom: -36,
    width: 150,
    height: 100,
    borderRadius: 90,
    backgroundColor: "rgba(14,165,168,0.10)",
    transform: [{ rotate: "-20deg" }],
  },
  waveTwo: {
    position: "absolute",
    right: 30,
    bottom: -52,
    width: 130,
    height: 90,
    borderRadius: 70,
    backgroundColor: "rgba(37,99,235,0.08)",
    transform: [{ rotate: "-14deg" }],
  },
  projectTop: {
    flexDirection: "row",
    marginTop: 14,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  projectInfo: {
    flex: 1,
    marginLeft: 14,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: "900",
  },
  projectDescription: {
    marginTop: 6,
    lineHeight: 21,
  },
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 999,
  },
  statusText: {
    marginLeft: 6,
    fontWeight: "900",
  },
  memberBox: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  memberText: {
    marginLeft: 5,
    fontWeight: "800",
  },
  progressLabel: {
    marginTop: 16,
    fontWeight: "900",
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(148,163,184,0.24)",
    marginTop: 9,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  deadlineRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  deadlineText: {
    marginLeft: 6,
    fontWeight: "700",
  },
});
