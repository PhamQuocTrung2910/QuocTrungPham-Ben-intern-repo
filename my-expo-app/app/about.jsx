import { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Link } from 'expo-router';
import ThemedView from '../components/ThemedView';
import ThemedText from '../components/ThemedText';
import Spacer from '../components/Spacer';
import { getUsers } from '../constants/api'; // Import API call

const About = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers(); // API call
        setUsers(data);
      } catch (err) {
        console.error('API error:', err.message); // use err
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>About Page</ThemedText>
      <Spacer />

      {/* Show loading spinner */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Show error message */}
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}

      {/* Show fetched users */}
      {!loading && !error && users.length > 0 && (
        <View>
          {users.map(user => (
            <ThemedText key={user.id} style={styles.user}>
              {user.name}
            </ThemedText>
          ))}
        </View>
      )}

      <Spacer />

      <Link href={'/'} style={styles.link}>
        <ThemedText>Back Home</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  user: {
    fontSize: 16,
    marginVertical: 4,
  },
});
