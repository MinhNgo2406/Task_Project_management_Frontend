import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemeContext } from "../../App";
import { getScreenTheme } from "../theme/appTheme";
import { notifications as defaultNotifications } from "../data/mockData";

function NotificationCard({ item, onPress, theme, isDarkMode }) {
  const color = item.read ? theme.subText : "#0EA5A8";

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <LinearGradient
        colors={
          item.read
            ? isDarkMode
              ? theme.whiteCard
              : ["#FFFFFF", "#F8FAFC"]
            : isDarkMode
              ? theme.cyanCard
              : ["#ECFEFF", "#DFFBFF"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.notificationCard,
          {
            borderColor: theme.cardBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View style={[styles.iconBox, { backgroundColor: `${color}18` }]}>
          <MaterialCommunityIcons
            name={item.read ? "email-open-outline" : "email-outline"}
            size={30}
            color={color}
          />
        </View>

        <View style={styles.notificationContent}>
          <Text style={[styles.notificationTitle, { color: theme.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.notificationMessage, { color: theme.subText }]}>
            {item.message}
          </Text>
        </View>

        {!item.read && <View style={styles.unreadDot} />}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function NotificationsScreen() {
  const { isDarkMode } = React.useContext(ThemeContext);
  const theme = getScreenTheme(isDarkMode);

  const [notifications, setNotifications] =
    React.useState(defaultNotifications);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((item) => ({
        ...item,
        read: true,
      })),
    );
  };

  const markOneAsRead = (id) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={
          isDarkMode ? theme.headerCard : ["#ECFEFF", "#EEF2FF", "#F8FAFC"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.headerCard,
          {
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <View>
          <Text style={[styles.title, { color: theme.text }]}>
            Notifications
          </Text>
          <Text style={[styles.subtitle, { color: theme.subText }]}>
            Bạn có {unreadCount} thông báo chưa đọc
          </Text>
        </View>

        <View style={[styles.headerIcon, { backgroundColor: theme.softWhite }]}>
          <MaterialCommunityIcons
            name="bell-ring-outline"
            size={42}
            color="#0EA5A8"
          />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </LinearGradient>

      <Button
        mode="contained"
        icon="check-all"
        onPress={markAllAsRead}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Mark all as read
      </Button>

      {notifications.map((item) => (
        <NotificationCard
          key={item.id}
          item={item}
          theme={theme}
          isDarkMode={isDarkMode}
          onPress={() => markOneAsRead(item.id)}
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
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 6,
  },
  headerIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    right: 2,
    top: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#0EA5A8",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },
  button: {
    borderRadius: 16,
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  notificationCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationContent: {
    flex: 1,
    marginLeft: 14,
  },
  notificationTitle: {
    fontSize: 17,
    fontWeight: "900",
  },
  notificationMessage: {
    marginTop: 5,
    lineHeight: 20,
  },
  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0EA5A8",
  },
});
