import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { getPopularMovies } from "./src/api/tmdb";
import MovieFeed from "./src/components/MovieFeed";
import type { Movie } from "./src/types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  async function loadMoreMovies() {
    if (loading) return;

    try {
      setLoading(true);

      const nextPage = page + 1;

      const data = await getPopularMovies(nextPage);

      console.log("LOADED PAGE:", nextPage);
      console.log("MOVIES RECEIVED:", data.results.length);

      setMovies((currentMovies) => [...currentMovies, ...data.results]);

      setPage(nextPage);
    } catch (error) {
      console.error("LOAD MORE MOVIES ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <MovieFeed
        movies={movies}
        onEndReached={loadMoreMovies}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
