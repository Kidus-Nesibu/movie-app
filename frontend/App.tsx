import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { getPopularMovies } from "./src/api/tmdb";
import MovieFeed from "./src/components/MovieFeed";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { AuthProvider, useAuth } from "./src/auth/AuthContext";
import type { Movie } from "./src/types/movie";
import ProfileButton from "./src/components/ProfileButton";

function AppContent() {
  const {
    user,
    loading: authLoading,
    logout,
  } = useAuth();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function loadMovies() {
      try {
        const data = await getPopularMovies();

        console.log("INITIAL MOVIES:", data.results.length);

        setMovies(data.results);
      } catch (error) {
        console.error("MOVIE API ERROR:", error);
      }
    }

    loadMovies();
  }, [user]);

  async function loadMoreMovies() {
    if (loading) return;

    try {
      setLoading(true);

      const nextPage = page + 1;

      const data = await getPopularMovies(nextPage);

      console.log("LOADED PAGE:", nextPage);
      console.log("MOVIES RECEIVED:", data.results.length);

      setMovies((currentMovies) => [
        ...currentMovies,
        ...data.results,
      ]);

      setPage(nextPage);
    } catch (error) {
      console.error("LOAD MORE MOVIES ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return <View style={styles.container} />;
  }

  if (!user) {
    if (showRegister) {
      return (
        <RegisterScreen
          onLoginPress={() => setShowRegister(false)}
          onRegistered={() => setShowRegister(false)}
        />
      );
    }

    return (
      <LoginScreen
        onRegisterPress={() => setShowRegister(true)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <MovieFeed
        movies={movies}
        onEndReached={loadMoreMovies}
        loading={loading}
      />

      <ProfileButton onPress={logout} />
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});