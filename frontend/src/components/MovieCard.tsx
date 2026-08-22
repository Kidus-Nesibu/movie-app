import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import type { Movie } from "../types/movie";
import MovieActions from "./MovieActions";
import ProfileButton from "./ProfileButton";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <View style={styles.movieSlide}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.movieImage}
        onError={(error) => {
          console.log("IMAGE FAILED:", movie.title, error.nativeEvent.error);
        }}
      />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.9)"]}
        locations={[0, 0.45, 1]}
        style={styles.overlay}
      />

      <View style={styles.movieInfo}>
        <Text style={styles.movieLabel}>MOVIE</Text>

        <Text style={styles.movieTitle}>{movie.title}</Text>

        <View style={styles.movieMeta}>
          <Text style={styles.movieRating}>
            ⭐ {movie.vote_average.toFixed(1)}
          </Text>

          <View style={styles.dot} />

          <Text style={styles.movieYear}>
            {movie.release_date?.slice(0, 4)}
          </Text>
        </View>

        <Text style={styles.movieDescription} numberOfLines={3}>
          {movie.overview}
        </Text>
      </View>
      <MovieActions />
      <ProfileButton />
    </View>
  );
}

const styles = StyleSheet.create({
  movieSlide: {
    height: SCREEN_HEIGHT,
    width: "100%",
    position: "relative",
    backgroundColor: "#000",
  },

  movieImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  movieInfo: {
    position: "absolute",
    left: 20,
    right: 35,
    bottom: 45,
  },

  movieLabel: {
    color: "#aaa",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 8,
  },

  movieTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 10,
  },

  movieMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  movieRating: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#aaa",
    marginHorizontal: 10,
  },

  movieYear: {
    color: "#ddd",
    fontSize: 14,
  },

  movieDescription: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 360,
  },
});
