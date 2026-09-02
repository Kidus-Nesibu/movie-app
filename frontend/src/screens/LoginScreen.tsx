import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "../auth/AuthContext";

type LoginScreenProps = {
  onRegisterPress: () => void;
};

export default function LoginScreen({
  onRegisterPress,
}: LoginScreenProps) {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await login(username, password);
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Text style={styles.subtitle}>
        Log in to continue
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <Pressable
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </Pressable>

      <Pressable
        style={styles.registerButton}
        onPress={onRegisterPress}
        disabled={loading}
      >
        <Text style={styles.registerText}>
          Don't have an account? Create one
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    color: "#888",
    fontSize: 16,
    marginBottom: 32,
  },

  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    height: 52,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },

  error: {
    color: "#ff4d4d",
    marginBottom: 16,
  },

  button: {
    height: 52,
    backgroundColor: "#e50914",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  registerButton: {
    marginTop: 24,
    alignItems: "center",
  },

  registerText: {
    color: "#aaa",
    fontSize: 14,
  },
});
