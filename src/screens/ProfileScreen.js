import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Avatar, Text, Switch } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemeContext } from "../../App";
import { user, projects, tasks, notifications } from "../data/mockData";

function StatBox({ icon, label, value, color, colors, isDarkMode }) {
  return (
    <LinearGradient colors={colors} style={styles.statBox}>
      <MaterialCommunityIcons name={icon} size={28} color={color} />
      <Text
        style={[
          styles.statValue,
          { color: isDarkMode ? "#F8FAFC" : "#0F172A" },
        ]}
      >
        {value}
      </Text>
      <Text
        style={[
          styles.statLabel,
          { color: isDarkMode ? "#CBD5E1" : "#64748B" },
        ]}
      >
        {label}
      </Text>
    </LinearGradient>
  );
}

function SettingItem({
  icon,
  title,
  subtitle,
  color,
  right,
  onPress,
  isDarkMode,
}) {
  const itemColors = isDarkMode
    ? ["#1E293B", "#0F172A"]
    : ["#FFFFFF", "#F8FAFC"];

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <LinearGradient colors={itemColors} style={styles.settingItem}>
        <View style={[styles.settingIcon, { backgroundColor: `${color}20` }]}>
          <MaterialCommunityIcons name={icon} size={26} color={color} />
        </View>

        <View style={styles.settingTextBox}>
          <Text
            style={[
              styles.settingTitle,
              { color: isDarkMode ? "#F8FAFC" : "#0F172A" },
            ]}
          >
            {title}
          </Text>

          {subtitle ? (
            <Text
              style={[
                styles.settingSubtitle,
                { color: isDarkMode ? "#CBD5E1" : "#64748B" },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {right ? (
          right
        ) : (
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            color={isDarkMode ? "#CBD5E1" : "#94A3B8"}
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { isDarkMode, setIsDarkMode, colors } = React.useContext(ThemeContext);

  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const pendingTasks = tasks.filter((task) => task.status !== "Done").length;
  const unreadNotifications = notifications.filter((item) => !item.read).length;

  const profileColors = isDarkMode
    ? ["#1E293B", "#0F172A", "#111827"]
    : ["#EEF2FF", "#F5F3FF", "#F8FAFC"];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={profileColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.profileCard,
          { borderColor: isDarkMode ? "#334155" : "rgba(255,255,255,0.9)" },
        ]}
      >
        <View
          style={[
            styles.profileCircleOne,
            {
              backgroundColor: isDarkMode
                ? "rgba(192,132,252,0.16)"
                : "rgba(124,58,237,0.12)",
            },
          ]}
        />
        <View
          style={[
            styles.profileCircleTwo,
            {
              backgroundColor: isDarkMode
                ? "rgba(139,158,255,0.14)"
                : "rgba(37,99,235,0.10)",
            },
          ]}
        />

        <Avatar.Text
          size={92}
          label="NM"
          style={styles.avatar}
          labelStyle={styles.avatarLabel}
        />

        <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
        <Text style={[styles.email, { color: colors.subText }]}>
          {user.email}
        </Text>

        <View
          style={[
            styles.roleChip,
            {
              backgroundColor: isDarkMode
                ? "rgba(192,132,252,0.18)"
                : "rgba(124,58,237,0.14)",
            },
          ]}
        >
          <MaterialCommunityIcons
            name="shield-account"
            size={18}
            color={isDarkMode ? "#C084FC" : "#7C3AED"}
          />
          <Text
            style={[
              styles.roleText,
              { color: isDarkMode ? "#C084FC" : "#6D28D9" },
            ]}
          >
            {user.role}
          </Text>
        </View>
      </LinearGradient>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Statistics
      </Text>

      <View style={styles.statRow}>
        <StatBox
          icon="folder-multiple"
          label="Projects"
          value={projects.length}
          color={isDarkMode ? "#8B9EFF" : "#2563EB"}
          colors={isDarkMode ? ["#1E293B", "#172554"] : ["#EFF6FF", "#DBEAFE"]}
          isDarkMode={isDarkMode}
        />

        <StatBox
          icon="check-circle"
          label="Done"
          value={completedTasks}
          color="#22C55E"
          colors={isDarkMode ? ["#1E293B", "#14532D"] : ["#F0FDF4", "#DCFCE7"]}
          isDarkMode={isDarkMode}
        />
      </View>

      <View style={styles.statRow}>
        <StatBox
          icon="timer-sand"
          label="Pending"
          value={pendingTasks}
          color="#F97316"
          colors={isDarkMode ? ["#1E293B", "#431407"] : ["#FFF7ED", "#FFEDD5"]}
          isDarkMode={isDarkMode}
        />

        <StatBox
          icon="bell-ring"
          label="Unread"
          value={unreadNotifications}
          color="#0EA5A8"
          colors={isDarkMode ? ["#1E293B", "#164E63"] : ["#ECFEFF", "#CFFAFE"]}
          isDarkMode={isDarkMode}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Workspace
      </Text>

      <SettingItem
        icon="office-building"
        title="Main Workspace"
        subtitle="Quản lý workspace hiện tại"
        color={isDarkMode ? "#8B9EFF" : "#2563EB"}
        isDarkMode={isDarkMode}
      />

      <SettingItem
        icon="account-group"
        title="Workspace Members"
        subtitle="Quản lý thành viên trong nhóm"
        color={isDarkMode ? "#C084FC" : "#7C3AED"}
        isDarkMode={isDarkMode}
      />

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Settings
      </Text>

      <SettingItem
        icon="theme-light-dark"
        title="Dark Mode"
        subtitle={isDarkMode ? "Đang bật chế độ tối" : "Đang bật chế độ sáng"}
        color={isDarkMode ? "#C084FC" : "#0F172A"}
        isDarkMode={isDarkMode}
        right={
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(!isDarkMode)}
          />
        }
      />

      <SettingItem
        icon="account-edit"
        title="Edit Profile"
        subtitle="Cập nhật thông tin cá nhân"
        color="#16A34A"
        isDarkMode={isDarkMode}
        onPress={() => Alert.alert("Demo", "Edit Profile frontend demo")}
      />

      <SettingItem
        icon="lock-reset"
        title="Change Password"
        subtitle="Đổi mật khẩu tài khoản"
        color="#F97316"
        isDarkMode={isDarkMode}
        onPress={() => Alert.alert("Demo", "Change Password frontend demo")}
      />

      <SettingItem
        icon="bell-cog"
        title="Notification Settings"
        subtitle="Cài đặt thông báo"
        color="#0EA5A8"
        isDarkMode={isDarkMode}
        onPress={() =>
          Alert.alert("Demo", "Notification settings frontend demo")
        }
      />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => Alert.alert("Logout", "Logout frontend demo")}
      >
        <LinearGradient
          colors={isDarkMode ? ["#450A0A", "#1E293B"] : ["#FEF2F2", "#FFF1F2"]}
          style={styles.logoutButton}
        >
          <MaterialCommunityIcons name="logout" size={24} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 38,
  },
  profileCard: {
    borderRadius: 30,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
    borderWidth: 1,
  },
  profileCircleOne: {
    position: "absolute",
    right: -40,
    bottom: -40,
    width: 160,
    height: 130,
    borderRadius: 90,
  },
  profileCircleTwo: {
    position: "absolute",
    left: -40,
    top: -50,
    width: 150,
    height: 120,
    borderRadius: 80,
  },
  avatar: {
    backgroundColor: "#7C3AED",
  },
  avatarLabel: {
    fontWeight: "900",
  },
  name: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: "900",
  },
  email: {
    marginTop: 6,
  },
  roleChip: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  roleText: {
    marginLeft: 6,
    fontWeight: "900",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 12,
    marginTop: 6,
  },
  statRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 10,
  },
  statBox: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: 26,
    fontWeight: "900",
    marginTop: 6,
  },
  statLabel: {
    fontWeight: "800",
  },
  settingItem: {
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  settingIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  settingTextBox: {
    flex: 1,
    marginLeft: 14,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  settingSubtitle: {
    marginTop: 3,
  },
  logoutButton: {
    marginTop: 10,
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "900",
    fontSize: 16,
    marginLeft: 8,
  },
});
