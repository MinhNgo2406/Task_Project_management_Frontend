import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Card,
  HelperText,
  useTheme,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const theme = useTheme();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPasswordValid = (value) => {
    return value.length >= 6;
  };

  const handleRegister = async () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }

    if (!isPasswordValid(password)) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);

      const usersData = await AsyncStorage.getItem("users");
      const users = usersData ? JSON.parse(usersData) : [];

      const existedUser = users.find(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
      );

      if (existedUser) {
        Alert.alert("Lỗi", "Email này đã được đăng ký");
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        role: "Member",
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, newUser];

      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

      Alert.alert("Thành công", "Đăng ký tài khoản thành công", [
        {
          text: "Đăng nhập",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (error) {
      console.log("Register error:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>
            Create Account
          </Text>
          <Text style={styles.subtitle}>
            Tạo tài khoản để bắt đầu sử dụng app
          </Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Họ và tên"
              value={fullName}
              onChangeText={setFullName}
              mode="outlined"
              left={<TextInput.Icon icon="account-outline" />}
              style={styles.input}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email-outline" />}
              style={styles.input}
            />

            <TextInput
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock-outline" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off-outline" : "eye-outline"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
            />

            <HelperText
              type={
                password.length === 0 || isPasswordValid(password)
                  ? "info"
                  : "error"
              }
            >
              Mật khẩu cần ít nhất 6 ký tự
            </HelperText>

            <TextInput
              label="Nhập lại mật khẩu"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              left={<TextInput.Icon icon="lock-check-outline" />}
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.registerButton}
              contentStyle={styles.buttonContent}
            >
              Đăng ký
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.navigate("Login")}
              style={styles.linkButton}
            >
              Đã có tài khoản? Đăng nhập
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    marginBottom: 28,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 8,
    color: "#64748B",
  },
  card: {
    borderRadius: 24,
    elevation: 4,
  },
  input: {
    marginBottom: 12,
  },
  registerButton: {
    marginTop: 10,
    borderRadius: 14,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  linkButton: {
    marginTop: 12,
  },
});
