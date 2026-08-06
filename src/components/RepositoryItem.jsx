import { View, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  fullName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    color: "grey",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  language: {
    backgroundColor: "#0366d6",
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  languageText: {
    color: "white",
    fontWeight: "bold",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: "bold",
    fontSize: 14,
  },
  statLabel: {
    color: "grey",
    fontSize: 12,
    marginTop: 2,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
};

const StatItem = ({ value, label }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{formatCount(value)}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.infoContainer}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.language}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsRow}>
        <StatItem value={item.stargazersCount} label="Stars" />
        <StatItem value={item.forksCount} label="Forks" />
        <StatItem value={item.reviewCount} label="Reviews" />
        <StatItem value={item.ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
