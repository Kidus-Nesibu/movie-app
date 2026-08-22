import { FlatList, StyleSheet } from "react-native";

import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

type MovieFeedProps = {
  movies: Movie[];
  onEndReached: () => void;
  loading: boolean;
};

export default function MovieFeed({
  movies,
  onEndReached,
  loading,
}: MovieFeedProps) {
  return (
    <FlatList
      data={movies}
      keyExtractor={(movie) => movie.id.toString()}
      renderItem={({ item }) => <MovieCard movie={item} />}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={2}
      style={styles.feed}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      windowSize={5}
      removeClippedSubviews
    />
  );
}

const styles = StyleSheet.create({
  feed: {
    flex: 1,
  },
});
