import React from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { Text, TextInput, Button, SegmentedButtons } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemeContext } from "../../App";
import { getScreenTheme } from "../theme/appTheme";

const BLUE = "#2563EB";
const TEAL = "#0EA5A8";
const CYAN = "#06B6D4";

export default function CreateProjectScreen({ navigation }) {
  const { isDarkMode } = React.useContext(ThemeContext);
  const theme = getScreenTheme(isDarkMode);

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
        <View style={styles.headerCircleOne} />
        <View style={styles.headerCircleTwo} />

        <View>
          <Text style={[styles.title, { color: theme.text }]}>
            Create Project
          </Text>

          <Text style={[styles.subtitle, { color: theme.subText }]}>
            Tạo dự án mới cho team của bạn
          </Text>
        </View>

        <View style={[styles.headerIcon, { backgroundColor: theme.softWhite }]}>
          <MaterialCommunityIcons name="folder-plus" size={42} color={BLUE} />
        </View>
      </LinearGradient>

      <LinearGradient
        colors={isDarkMode ? theme.whiteCard : ["#FFFFFF", "#F8FAFC"]}
        style={[
          styles.formCard,
          {
            borderColor: theme.cardBorder,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Project Information
        </Text>

        <TextInput
          label="Project name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.surface }]}
          textColor={theme.text}
          outlineColor={theme.border}
          activeOutlineColor={BLUE}
          left={<TextInput.Icon icon="briefcase-outline" />}
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={[styles.input, { backgroundColor: theme.surface }]}
          textColor={theme.text}
          outlineColor={theme.border}
          activeOutlineColor={TEAL}
          left={<TextInput.Icon icon="text-box-outline" />}
        />

        <TextInput
          label="Deadline"
          placeholder="VD: 25/05/2026"
          value={deadline}
          onChangeText={setDeadline}
          mode="outlined"
          style={[styles.input, { backgroundColor: theme.surface }]}
          textColor={theme.text}
          outlineColor={theme.border}
          activeOutlineColor={TEAL}
          left={<TextInput.Icon icon="calendar-clock" />}
        />

        <TextInput
          label="Members"
          placeholder="VD: 5"
          value={members}
          onChangeText={setMembers}
          mode="outlined"
          keyboardType="numeric"
          style={[styles.input, { backgroundColor: theme.surface }]}
          textColor={theme.text}
          outlineColor={theme.border}
          activeOutlineColor={BLUE}
          left={<TextInput.Icon icon="account-group-outline" />}
        />

        <Text style={[styles.label, { color: theme.text }]}>
          Project Status
        </Text>

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
          colors={isDarkMode ? theme.tealCard : ["#F0FDFA", "#CCFBF1"]}
          style={styles.previewBox}
        >
          <View style={styles.previewIcon}>
            <MaterialCommunityIcons
              name="rocket-launch"
              size={30}
              color={TEAL}
            />
          </View>

          <View style={styles.previewTextBox}>
            <Text style={[styles.previewTitle, { color: theme.text }]}>
              {name.trim() || "Project Preview"}
            </Text>

            <Text style={[styles.previewSubtitle, { color: theme.subText }]}>
              {description.trim() || "Mô tả project sẽ hiển thị ở đây."}
            </Text>
          </View>
        </LinearGradient>

        <Button
          mode="contained"
          icon="plus"
          buttonColor={BLUE}
          textColor="#FFFFFF"
          onPress={handleCreate}
          style={styles.createButton}
          contentStyle={styles.buttonContent}
        >
          Create Project
        </Button>

        <Button
          mode="text"
          textColor={TEAL}
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
  headerCircleOne: {
    position: "absolute",
    right: -38,
    bottom: -42,
    width: 160,
    height: 130,
    borderRadius: 90,
    backgroundColor: "rgba(14,165,168,0.12)",
  },
  headerCircleTwo: {
    position: "absolute",
    left: -42,
    top: -50,
    width: 150,
    height: 120,
    borderRadius: 80,
    backgroundColor: "rgba(37,99,235,0.10)",
  },
  title: {
    fontSize: 32,
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
  formCard: {
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 16,
  },
  input: {
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    fontWeight: "900",
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
    backgroundColor: "rgba(14,165,168,0.14)",
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
  },
  previewSubtitle: {
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
