import React from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { Text, TextInput, Button, SegmentedButtons } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CreateProjectScreen({ navigation }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [members, setMembers] = React.useState("");
  const [status, setStatus] = React.useState("Planning");

  const handleCreate = () => {
    if (!name.trim() || !description.trim() || !deadline.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập tên, mô tả và deadline.");
      return;
    }

    Alert.alert("Thành công", "Project đã được tạo - frontend demo", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={["#EFF6FF", "#F5F3FF", "#F8FAFC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <View>
          <Text style={styles.title}>Create Project</Text>
          <Text style={styles.subtitle}>Tạo dự án mới cho team của bạn</Text>
        </View>

        <View style={styles.headerIcon}>
          <MaterialCommunityIcons
            name="folder-plus"
            size={42}
            color="#2563EB"
          />
        </View>
      </LinearGradient>

      <LinearGradient colors={["#FFFFFF", "#F8FAFC"]} style={styles.formCard}>
        <Text style={styles.sectionTitle}>Project Information</Text>

        <TextInput
          label="Project name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="briefcase-outline" />}
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
          left={<TextInput.Icon icon="text-box-outline" />}
        />

        <TextInput
          label="Deadline"
          placeholder="VD: 25/05/2026"
          value={deadline}
          onChangeText={setDeadline}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="calendar-clock" />}
        />

        <TextInput
          label="Members"
          placeholder="VD: 5"
          value={members}
          onChangeText={setMembers}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          left={<TextInput.Icon icon="account-group-outline" />}
        />

        <Text style={styles.label}>Project Status</Text>

        <SegmentedButtons
          value={status}
          onValueChange={setStatus}
          buttons={[
            { value: "Planning", label: "Planning" },
            { value: "In Progress", label: "Doing" },
            { value: "Review", label: "Review" },
          ]}
          style={styles.segment}
        />

        <LinearGradient
          colors={["#FAF5FF", "#EEF2FF"]}
          style={styles.previewBox}
        >
          <View style={styles.previewIcon}>
            <MaterialCommunityIcons
              name="rocket-launch"
              size={30}
              color="#7C3AED"
            />
          </View>

          <View style={styles.previewTextBox}>
            <Text style={styles.previewTitle}>
              {name.trim() || "Project Preview"}
            </Text>
            <Text style={styles.previewSubtitle}>
              {description.trim() || "Mô tả project sẽ hiển thị ở đây."}
            </Text>
          </View>
        </LinearGradient>

        <Button
          mode="contained"
          icon="plus"
          onPress={handleCreate}
          style={styles.createButton}
          contentStyle={styles.buttonContent}
        >
          Create Project
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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
    borderColor: "rgba(255,255,255,0.9)",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#020617",
  },
  subtitle: {
    color: "#64748B",
    fontSize: 16,
    marginTop: 6,
  },
  headerIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "rgba(255,255,255,0.78)",
    alignItems: "center",
    justifyContent: "center",
  },
  formCard: {
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#020617",
    marginBottom: 16,
  },
  input: {
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontSize: 15,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 10,
  },
  segment: {
    marginBottom: 16,
  },
  previewBox: {
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  previewIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(124,58,237,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  previewTextBox: {
    flex: 1,
    marginLeft: 14,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },
  previewSubtitle: {
    color: "#64748B",
    marginTop: 4,
    lineHeight: 20,
  },
  createButton: {
    borderRadius: 16,
  },
  buttonContent: {
    paddingVertical: 7,
  },
  cancelButton: {
    marginTop: 8,
  },
});
