import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import ProjectDetailScreen from "../screens/ProjectDetailScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import MyTasksScreen from "../screens/MyTasksScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{ title: "Project Detail" }}
      />

      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: "Task Detail" }}
      />

      <Stack.Screen
        name="CreateProject"
        component={CreateProjectScreen}
        options={{ title: "Create Project" }}
      />

      <Stack.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{ title: "Create Task" }}
      />

      <Stack.Screen
        name="MyTasks"
        component={MyTasksScreen}
        options={{ title: "My Tasks" }}
      />
    </Stack.Navigator>
  );
}
