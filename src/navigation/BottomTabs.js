import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DashboardScreen from "../screens/DashboardScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import TasksScreen from "../screens/TasksScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyTasksScreen from "../screens/MyTasksScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#64748B",
        tabBarIcon: ({ color, size }) => {
          let iconName = "home";

          if (route.name === "Dashboard") iconName = "view-dashboard";
          if (route.name === "Projects") iconName = "folder-multiple";
          if (route.name === "Tasks")
            iconName = "checkbox-marked-circle-outline";
          if (route.name === "Notifications") iconName = "bell-outline";
          if (route.name === "Profile") iconName = "account-circle-outline";
          if (route.name === "My Tasks") iconName = "account-check-outline";

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="My Tasks" component={MyTasksScreen} />
    </Tab.Navigator>
  );
}
