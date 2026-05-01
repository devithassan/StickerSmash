import { Image, StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {




  return (
    <View style={styles.container}>

      {/* HERO IMAGE */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' }}
        style={styles.heroImage}
      />

      {/* TITLE */}
      <Text style={styles.title}>💪 Fitness Tracker</Text>
      <Text style={styles.subtitle}>
        Track your workouts, stay consistent, and build a better you.
      </Text>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔥 Get Started Fast</Text>
        <Text style={styles.cardText}>
          Log workouts, track progress, and view your stats in real time.
        </Text>
      </View>

      {/* BUTTONS */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    justifyContent: 'center',
    gap: 15,
  },

  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },

  subtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 15,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

  cardText: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 5,
  },

  primaryBtn: {
    backgroundColor: '#38bdf8',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  btnText: {
    color: 'black',
    fontWeight: 'bold',
  },

  secondaryBtn: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#38bdf8',
  },

  secondaryText: {
    color: '#38bdf8',
    fontWeight: 'bold',
  },
});