import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

import ProjectDetailScreen from "../screens/ProjectDetailScreen";
import TaskDetailScreen from "../screens/TaskDetailScreen";
import CreateProjectScreen from "../screens/CreateProjectScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import MyTasksScreen from "../screens/MyTasksScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
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
