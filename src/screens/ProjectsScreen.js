import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Searchbar, Button, Snackbar } from "react-native-paper";
import ProjectCard from "../components/ProjectCard";
import { projects, user } from "../data/mockData";
import { hasPermission } from "../utils/permissions";

export default function ProjectsScreen({ navigation }) {
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
      <ScrollView style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Projects
        </Text>

        <Text style={styles.roleText}>Current role: {user.role}</Text>

        <Button
          mode="contained"
          icon="plus"
          onPress={handleCreateProject}
          style={styles.button}
        >
          Create Project
        </Button>

        <Searchbar
          placeholder="Search project..."
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
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
    padding: 16,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  roleText: {
    marginBottom: 12,
    color: "#64748B",
  },
  button: {
    marginBottom: 14,
    borderRadius: 12,
  },
  search: {
    marginBottom: 16,
  },
});
