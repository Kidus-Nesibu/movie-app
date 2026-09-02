import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { registerUser } from "../api/backend";

type RegisterScreenProps = {
  onLoginPress: () => void;
  onRegistered: () => void;
};

export default function RegisterScreen({
  onLoginPress,
  onRegistered,
}: RegisterScreenProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerUser(username, email, password);

      onRegistered();
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setError("Could not create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.subtitle}>
        Sign up to start using the app
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
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <Pressable
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </Pressable>

      <Pressable
        style={styles.loginButton}
        onPress={onLoginPress}
        disabled={loading}
      >
        <Text style={styles.loginText}>
          Already have an account? Log in
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

  loginButton: {
    marginTop: 24,
    alignItems: "center",
  },

  loginText: {
    color: "#aaa",
    fontSize: 14,
  },
});
