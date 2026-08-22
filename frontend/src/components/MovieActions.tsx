import { Pressable, StyleSheet, Text, View } from "react-native";

type MovieActionsProps = {
  onLike?: () => void;
  onShare?: () => void;
  onWatchlist?: () => void;
};

export default function MovieActions({
  onLike,
  onShare,
  onWatchlist,
}: MovieActionsProps) {
  return (
    <View style={styles.actions}>
      <Pressable style={styles.actionButton} onPress={onLike}>
        <Text style={styles.actionIcon}>♡</Text>
        <Text style={styles.actionText}>Like</Text>
      </Pressable>

      <Pressable style={styles.actionButton} onPress={onShare}>
        <Text style={styles.actionIcon}>↗</Text>
        <Text style={styles.actionText}>Share</Text>
      </Pressable>

      <Pressable style={styles.actionButton} onPress={onWatchlist}>
        <Text style={styles.actionIcon}>＋</Text>
        <Text style={styles.actionText}>Watchlist</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -75 }],
    alignItems: "center",
    gap: 24,
  },

  actionButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  actionIcon: {
    color: "#fff",
    fontSize: 34,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
  },

  actionText: {
    color: "#fff",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "600",
  },
});
